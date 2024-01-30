import Link from "next/link";


function Card(props) {


    return (
        <>
            <div className="card ">
                <div className="card-cover">
                	<img className="w-100" src={props.img} />
                </div>
                <Link href={props.href}>
                    <div className="fixed-text-2 title-card py-2">
                    {props.title}
                    </div>
                </Link>
                <Link href={props.href}>
                <div className="d-flex justify-content-end mt-5">
                    <p className="ci-color-green">See more</p>
                    <img className="ps-2" src="../../assets/image/card/arrow.svg" />
                </div>
                </Link>
            </div>
        </>
    );
}
export default Card;
