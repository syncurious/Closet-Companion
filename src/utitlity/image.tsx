const getMimeTypeFromBase64 = (base64: string): string => {
    if (typeof base64 !== 'string') {
        return 'image/jpeg';
    }
    if (base64.startsWith('iVBORw0KGgo')) return 'image/png';
    if (base64.startsWith('/9j/')) return 'image/jpeg';
    if (base64.startsWith('R0lGOD')) return 'image/gif';
    if (base64.startsWith('UklGR')) return 'image/webp';
    return 'image/jpeg'; // default fallback
};

const getBase64Url = (base64: string, mimeType?: string) => {
    if (typeof base64 !== 'string' || base64.trim() === '') {
        return '';
    }
    const finalMimeType = mimeType || getMimeTypeFromBase64(base64);
    return `data:${finalMimeType};base64,${base64}`;
};

export { getBase64Url };