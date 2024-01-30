import AdminLayout from "../../components/Layouts/Admin/AdminLayout";
import VoucherTable from "../../components/Voucher/VoucherTable";

const Voucher = () => {
	return (
		<AdminLayout pageTitle="Voucher Partners">
			<section>
				<VoucherTable />
			</section>
		</AdminLayout>
	);
};

export default Voucher;
