import Mainlayout from "/components/layouts/Mainlayout"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"

const NewsDetail = () => {

	const { query } = useRouter()
	const [news, setNews] = useState({})

	const handleFetch = async () => {

		let res = await fetch(`https://backoffice.siamcannabis.io/api/news-lists/${query.newsId}?populate=cover,image_more`, {
			method: "GET",
		})
		res = await res.json()
		if (res.data) {
			console.log(res.data)
			setNews(res.data.attributes)
		}

	}

	useEffect(() => {
		if(query.newsId){
			handleFetch()
		}
	}, [query.newsId])

	return (
		<>
			<section className="layout_news">
				<div className="container fix-container my-md-5 my-3">
					<div className="row">
						<div className="body_detailNews">
							<div className="col-12">
								<p className="tittle_detailNews">
									{news?.title}
								</p>
								<p className="date_detailNews">
									{news?.createdAt}
								</p>
								<img
									src={`https://backoffice.siamcannabis.io${news?.cover?.data?.attributes?.url}`}
									className="w-100 mb-4"
								/>
								<p className="text-detail_detailNews">
									<ReactMarkdown children={news?.detail} />
								</p>
								<div className="row mb-5">
									{news?.image_more?.data?.map(
										(item, index) => (
											<div className="col-sm-3 col-6">
												<img
													src={`https://backoffice.siamcannabis.io${item.attributes?.url}`}
													className="w-100 mb-2 rounded"
												/>
											</div>
										)
									)}
								</div>
								<hr className="hr_detailNews" />
								<p className="text-user_deatilNews">
									บทความโดย :&nbsp;
									<span className="text-user2_deatilNews">
										{news?.creator}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default NewsDetail
NewsDetail.layout = Mainlayout
