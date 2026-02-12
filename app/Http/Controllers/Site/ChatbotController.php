<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function ask(Request $request)
    {
        $userMessage = trim($request->input('message'));

        if (!$userMessage) {
            return response()->json([
                'reply' => 'من فضلك اكتب سؤالك بوضوح 😊'
            ]);
        }


        $offers = Offer::active()
            ->available()
            ->with([
                'tripType:id,name',
                'company:id,company_code',
                'hotels:id,name,city,stars,distance_from_kaaba,distance_from_nabawi',
                'governorates:id,name',
                'features:id,name',
            ])
            ->get();

        if ($offers->isEmpty()) {
            return response()->json([
                'reply' => 'لا توجد باقات متاحة حاليًا، يرجى المحاولة لاحقًا.'
            ]);
        }



        $systemPrompt = <<<PROMPT
أنت مساعد مبيعات ذكي ومتخصص فقط في باقات العمرة داخل هذا الموقع.

قواعد صارمة:
1- استخدم فقط البيانات الموجودة في CONTEXT.
2- ممنوع اختراع أي أسعار أو تفاصيل غير مذكورة.
3- عند ذكر الشركة استخدم company_code فقط.
4- أجب باللغة العربية فقط.
5- أسلوبك احترافي، مقنع للبيع، مختصر وواضح.
6- لو السؤال غير واضح اطلب توضيح.
7- لو لا توجد نتائج مناسبة أخبر العميل بلباقة.
8- عند عرض باقة اذكر:
   - العنوان
   - السعر
   - المدة
   - مستوى الرحلة
   - التقييم
   - الفنادق / المدينة
   - الشركة (company_code)
9- اختم دائمًا باقتراح خطوة تالية (الحجز – واتساب – التفاصيل).

PROMPT;

       

        $context = "CONTEXT:\n";

        foreach ($offers as $offer) {
            $context .= "-----------------------------\n";
            $context .= "Offer Code: {$offer->offer_code}\n";
            $context .= "Title: {$offer->title}\n";
            $context .= "Description: {$offer->desc}\n";
            $context .= "Price: {$offer->price} جنيه\n";
            $context .= "Duration: {$offer->duration_days} أيام\n";
            $context .= "Tour Level: {$offer->tour_level_label}\n";
            $context .= "Rating: {$offer->rating} ({$offer->number_of_rating_customers} عميل)\n";
            $context .= "Trip Type: {$offer->tripType->name}\n";
            $context .= "Company Code: {$offer->company->company_code}\n";
            $context .= "Available Places: {$offer->available_places}\n";
            $context .= "Start Date: {$offer->start_date}\n";
            $context .= "End Date: {$offer->end_date}\n";

            if ($offer->governorates->count()) {
                $context .= "Governorates: " .
                    $offer->governorates->pluck('name')->implode(', ') . "\n";
            }

            if ($offer->hotels->count()) {
                $context .= "Hotels:\n";
                foreach ($offer->hotels as $hotel) {
                    $distance = $hotel->city === 'مكة'
                        ? $hotel->distance_from_kaaba
                        : $hotel->distance_from_nabawi;

                    $context .= "- {$hotel->name} | {$hotel->city} | {$hotel->stars} نجوم | المسافة: {$distance} متر\n";
                }
            }

            if ($offer->features->count()) {
                $context .= "Features: " .
                    $offer->features->pluck('name')->implode(', ') . "\n";
            }

            $context .= "Price Includes: {$offer->price_contain}\n";
            $context .= "Price Excludes: {$offer->price_not_contain}\n";
        }


        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('services.openrouter.key'),
                'HTTP-Referer' => config('app.url'),
                'X-Title' => 'Umrah Hub AI Assistant',
            ])->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => 'openai/gpt-4o-mini',
                'temperature' => 0.3,
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $systemPrompt,
                    ],
                    [
                        'role' => 'user',
                        'content' => $context . "\n\nسؤال العميل: {$userMessage}",
                    ],
                ],
            ]);

            return response()->json([
                'reply' => $response['choices'][0]['message']['content']
                    ?? 'حدث خطأ أثناء معالجة الطلب.'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'reply' => 'تعذر الاتصال بالمساعد الذكي حاليًا.'
            ]);
        }
    }
}
