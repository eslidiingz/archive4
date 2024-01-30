import Head from "next/head";
import AdminLayout from "/components/Layouts/Admin/AdminLayout";

const Dashboard = () => {
	return (
		<>
			<Head>
				<title>Siam Cannabis Dashboard</title>
				<meta name="description" content="Siam Cannabis Dashboard" />
				<link rel="icon" href="/assets/logo.svg" />
			</Head>

			<AdminLayout pageTitle="Dashboard">
				<div className="py-4">
					<div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
				</div>
			</AdminLayout>
		</>
	);
};

export default Dashboard;
