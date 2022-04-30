const pdfContentType = "application/pdf";

const base64toBlob = (data) => {
    const bytes = atob(data);
    let {length} = bytes;
    const out = new Uint8Array(length);

    // eslint-disable-next-line no-plusplus
    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: pdfContentType });
};

export { pdfContentType, base64toBlob };
