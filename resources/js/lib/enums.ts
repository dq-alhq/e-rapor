export const statusDalamKeluarga = (code: number | null): string => {
    switch (code) {
        case 2:
            return 'Anak Tiri';
        case 3:
            return 'Anak Angkat';
        default:
        case 1:
            return 'Anak Kandung';
    }
};
