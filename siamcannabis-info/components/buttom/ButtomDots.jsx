import Link from "next/link";


function ButtomDots(props) {


    return (
        <>
        <Link href="/">
            {/* <button className="btn btn-dots-green"><i className="fas fa-circle mx-2"></i> Running Project</button> */}

            <button className={props.classset}><i className="fas fa-circle mx-2"></i>{props.text}</button>
        </Link>
        </>
    );
}
export default ButtomDots;