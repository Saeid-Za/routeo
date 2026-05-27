export function useDataExporter(fileContent: string, fileName: string) {
	const blob = new Blob([fileContent], {
		type: "text/json",
	})

	useDownloadFile(blob, fileName)
}

export function useDownloadFile(blob: Blob, fileName: string) {
	const url = window.URL.createObjectURL(blob)
	const a = document.createElement("a")
	a.href = url
	a.download = fileName
	document.body.appendChild(a) // append the element to the dom
	a.click()
	a.remove() // afterwards, remove the element
}
