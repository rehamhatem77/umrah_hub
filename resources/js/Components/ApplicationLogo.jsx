export default function ApplicationLogo(props) {
    return (
<a href="/">
         <img
style={{width:'130px', height:'auto'}}
            {...props}
            src="/omrahublogo.png"
            alt="OmraHub Logo"
        />
        </a>
    );
}
