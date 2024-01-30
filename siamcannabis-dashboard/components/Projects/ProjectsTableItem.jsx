import { memo } from "react";
import dayjs from "dayjs";

const ProjectsTableItem = ({ data = [], index }) => {
	return (
		<tr className="text-center">
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{index}</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.project_name}</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.zone_name}</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{dayjs(data.start_sale_time).format("DD/MM/YYYY HH:mm:ss")}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{dayjs(data.end_sale_time).format("DD/MM/YYYY HH:mm:ss")}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				{dayjs(data.end_holding_time).format("DD/MM/YYYY HH:mm:ss")}
			</td>
			{/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {data.project_name}
            </td> */}
		</tr>
	);
};

export default memo(ProjectsTableItem);
