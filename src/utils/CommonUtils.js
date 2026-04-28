class CommonUtils {

    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // convert db thanh anh
    static getBase64FromBuffer(data) {
        if (!data) return '';
        try {
            return new TextDecoder().decode(new Uint8Array(data));
        } catch (error) {
            console.error("Lỗi giải mã ảnh từ Buffer: ", error);
            return '';
        }
    }


    // ham nen anh
    static compressImage(base64Str, quality = 0.7) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;


                // ve them nen trang cho anh co nen trong suot
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedBase64);
            };
        });
    }


}

export default CommonUtils;