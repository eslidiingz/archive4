import Swal from "sweetalert2"

export const handleAlert = (icon,text) => {
	Swal.fire({
		icon: `${icon}`,
		title: `${text}`,
		showConfirmButton: false,
		timer: 2000
	})
}

export const saveUploadFile = async (dataFile) => {
	try {

		console.log(process.env.FILE_SERVER)
		
		if (dataFile.length <= 0)
			throw new Error('no data file!');

		const dataForm = new FormData();
		dataForm.append('file', dataFile[0]);
		const resFetch = await fetch(`${process.env.FILE_SERVER}/upload`, {
			method: "POST",
			body: dataForm,
		});

		const res = await resFetch.json();
		return res?.filename || null;

	} catch (err) {
		return err;
	}
}

export const delUploadFile = async (filename) => {
	try {
		const resFetch = await fetch(`${process.env.FILE_SERVER}/upload?filename=${filename}`, {
			method: "delete",
		});
		const res = await resFetch.json();
		return res?.delStatus;
	} catch (err) {
		return err;
	}
}

export const getUploadFile = (filename) => {
	try {
		return `${process.env.FILE_SERVER}/upload?filename=${filename}`;
	} catch (err) {
		return err;
	}
}
