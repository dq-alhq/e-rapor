export {};
declare global {
    export namespace model {
        export interface AnggotaEkskul {
            // columns
            id: number;
            anggota_kelas_id: number;
            ekskul_id: number | null;
            nilai: number | null;
            created_at: string | null;
            updated_at: string | null;
            // relations
            anggota_kelas: AnggotaKela;
            ekskul: Ekskul;
            // counts
            // exists
            anggota_kelas_exists: boolean;
            ekskul_exists: boolean;
        }

        export interface AnggotaKelas {
            // columns
            id: number;
            siswa_id: number;
            kelas_id: number;
            nilai_uts: number | null;
            rata_uts: number | null;
            nilai_akhir: number | null;
            rata_akhir: number | null;
            absensi_alpha: number | null;
            absensi_izin: number | null;
            absensi_sakit: number | null;
            cek_wali: boolean;
            cek_kepsek: boolean;
            created_at: string | null;
            updated_at: string | null;
            // relations
            siswa: Siswa;
            kelas: Kela;
            hasil_penilaian: HasilPenilaian[];
            anggota_ekskul: AnggotaEkskul[];
            anggota_proyek: AnggotaProyek[];
            catatan_wali_kelas: CatatanWaliKela[];
            // counts
            hasil_penilaian_count: number;
            anggota_ekskul_count: number;
            anggota_proyek_count: number;
            catatan_wali_kelas_count: number;
            // exists
            siswa_exists: boolean;
            kelas_exists: boolean;
            hasil_penilaian_exists: boolean;
            anggota_ekskul_exists: boolean;
            anggota_proyek_exists: boolean;
            catatan_wali_kelas_exists: boolean;
        }

        export interface AnggotaProyek {
            // columns
            id: number;
            anggota_kelas_id: number;
            proyek_id: number;
            pencapaian: string[];
            created_at: string | null;
            updated_at: string | null;
            // relations
            anggota_kelas: AnggotaKela;
            proyek: Proyek;
            // counts
            // exists
            anggota_kelas_exists: boolean;
            proyek_exists: boolean;
        }

        export interface CatatanWaliKelas {
            // columns
            id: number;
            wali_id: number;
            anggota_kelas_id: number;
            catatan: string | null;
            created_at: string | null;
            updated_at: string | null;
            // relations
            wali: Guru;
            anggota_kelas: AnggotaKela;
            // counts
            // exists
            wali_exists: boolean;
            anggota_kelas_exists: boolean;
        }

        export interface Dimensi {
            // columns
            id: number;
            fase: string;
            deskripsi: string;
            // relations
            elemen: Eleman[];
            // counts
            elemen_count: number;
            // exists
            elemen_exists: boolean;
        }

        export interface Ekskul {
            // columns
            id: number;
            guru_id: number;
            nama: string;
            deskripsi: string | null;
            created_at: string | null;
            updated_at: string | null;
            // relations
            guru: Guru;
            siswa: Siswa[];
            // counts
            siswa_count: number;
            // exists
            guru_exists: boolean;
            siswa_exists: boolean;
        }

        export interface Elemen {
            // columns
            id: number;
            dimensi_id: number;
            deskripsi: string;
            // relations
            subelemen: Subeleman[];
            dimensi: Dimensi;
            // counts
            subelemen_count: number;
            // exists
            subelemen_exists: boolean;
            dimensi_exists: boolean;
        }

        export interface Guru {
            // columns
            id: number;
            user_id: number | null;
            nama: string;
            jk: string;
            nip: string | null;
            nuptk: string | null;
            nik: string | null;
            tempat_lahir: string | null;
            tanggal_lahir: string | null;
            telepon: string | null;
            alamat: string | null;
            wilayah_id: number | null;
            created_at: string | null;
            updated_at: string | null;
            alamat_lengkap: string | null;
            avatar: string | null;
            // relations
            user: User;
            mapel: Mapel[];
            kelas: Kela[];
            pembelajaran: Pembelajaran[];
            ekskul: Ekskul[];
            wilayah: Wilayah;
            // counts
            mapel_count: number;
            kelas_count: number;
            pembelajaran_count: number;
            ekskul_count: number;
            // exists
            user_exists: boolean;
            mapel_exists: boolean;
            kelas_exists: boolean;
            pembelajaran_exists: boolean;
            ekskul_exists: boolean;
            wilayah_exists: boolean;
        }

        export interface HasilPenilaian {
            // columns
            id: number;
            anggota_kelas_id: number;
            penilaian_id: number;
            nilai: number | null;
            created_at: string | null;
            updated_at: string | null;
            // relations
            siswa: AnggotaKelas;
            penilaian: Penilaian;
            // counts
            // exists
            siswa_exists: boolean;
            penilaian_exists: boolean;
        }

        export interface Kelas {
            // columns
            id: number;
            tapel_id: number;
            wali_id: number;
            tingkat: number;
            nama: string;
            created_at: string | null;
            updated_at: string | null;
            // relations
            tapel: Tapel;
            anggota_kelas: AnggotaKela[];
            mapel: Mapel[];
            guru: Guru[];
            siswa: Siswa[];
            wali: Guru;
            // counts
            anggota_kelas_count: number;
            mapel_count: number;
            guru_count: number;
            siswa_count: number;
            // exists
            tapel_exists: boolean;
            anggota_kelas_exists: boolean;
            mapel_exists: boolean;
            guru_exists: boolean;
            siswa_exists: boolean;
            wali_exists: boolean;
        }

        export interface KelompokMapel {
            // columns
            id: number;
            nama: string;
            deskripsi: string | null;
            created_at: string | null;
            updated_at: string | null;
            // relations
            mapel: Mapel[];
            // counts
            mapel_count: number;
            // exists
            mapel_exists: boolean;
        }

        export interface Mapel {
            // columns
            id: number;
            kelompok_mapel_id: number;
            nama: string;
            singkatan: string;
            created_at: string | null;
            updated_at: string | null;
            // relations
            kelompok_mapel: KelompokMapel;
            kelas: Kela[];
            guru: Guru[];
            // counts
            kelas_count: number;
            guru_count: number;
            // exists
            kelompok_mapel_exists: boolean;
            kelas_exists: boolean;
            guru_exists: boolean;
        }

        export interface Operator {
            // columns
            id: number;
            user_id: number | null;
            nama: string;
            jk: string;
            nip: string | null;
            nik: string | null;
            nuptk: string | null;
            tempat_lahir: string | null;
            tanggal_lahir: string | null;
            telepon: string | null;
            alamat: string | null;
            wilayah_id: number | null;
            created_at: string | null;
            updated_at: string | null;
            alamat_lengkap: string | null;
            avatar: string | null;
            // relations
            user: User;
            wilayah: Wilayah;
            // counts
            // exists
            user_exists: boolean;
            wilayah_exists: boolean;
        }

        export interface Pembelajaran {
            // columns
            id: number;
            kelas_id: number;
            mapel_id: number;
            guru_id: number;
            kkm: number | null;
            created_at: string | null;
            updated_at: string | null;
            // relations
            penilaian: Penilaian[];
            kelas: Kela;
            mapel: Mapel;
            guru: Guru;
            // counts
            penilaian_count: number;
            // exists
            penilaian_exists: boolean;
            kelas_exists: boolean;
            mapel_exists: boolean;
            guru_exists: boolean;
        }

        export interface Penilaian {
            // columns
            id: number;
            pembelajaran_id: number;
            nama: string;
            materi: string | null;
            tujuan_pembelajaran: string[];
            created_at: string | null;
            updated_at: string | null;
            // relations
            pembelajaran: Pembelajaran;
            // counts
            // exists
            pembelajaran_exists: boolean;
        }

        export interface Proyek {
            // columns
            id: number;
            koordinator_id: number;
            tapel_id: number;
            tema: string;
            nama: string;
            deskripsi: string | null;
            elemen: string[];
            created_at: string | null;
            updated_at: string | null;
            // relations
            tapel: Tapel;
            siswa: Siswa[];
            koorinator: Guru;
            // counts
            siswa_count: number;
            // exists
            tapel_exists: boolean;
            siswa_exists: boolean;
            koorinator_exists: boolean;
        }

        export interface Sekolah {
            // columns
            id: number;
            nama: string;
            jenjang: string;
            npsn: string | null;
            nis: string | null;
            nss: string | null;
            nds: string | null;
            alamat: string | null;
            wilayah_id: number | null;
            kodepos: string | null;
            telepon: string | null;
            email: string | null;
            kepsek_id: number | null;
            created_at: string | null;
            updated_at: string | null;
            // relations
            wilayah: Wilayah;
            kepsek: Guru;
            // counts
            // exists
            wilayah_exists: boolean;
            kepsek_exists: boolean;
        }

        export interface Siswa {
            // columns
            id: number;
            user_id: number | null;
            nama: string;
            nis: string;
            nisn: string | null;
            nik: string | null;
            jk: string;
            tempat_lahir: string | null;
            tanggal_lahir: string | null;
            telepon: string | null;
            alamat: string | null;
            wilayah_id: number | null;
            status_dalam_keluarga: number | null;
            anak_ke: number | null;
            asal_sekolah: string | null;
            tahun_masuk: number | null;
            nama_ayah: string | null;
            pekerjaan_ayah: string | null;
            nama_ibu: string | null;
            pekerjaan_ibu: string | null;
            nama_wali: string | null;
            pekerjaan_wali: string | null;
            telepon_wali: string | null;
            created_at: string | null;
            updated_at: string | null;
            alamat_lengkap: string | null;
            avatar: string | null;
            // relations
            user: User;
            anggota_kelas: AnggotaKela[];
            kelas: Kelas[] | string;
            wilayah: Wilayah;
            ekskul: Ekskul[];
            proyek: Proyek[];
            hasil_penilaian: HasilPenilaian[];
            catatan_wali_kelas: CatatanWaliKela[];
            // counts
            anggota_kelas_count: number;
            kelas_count: number;
            ekskul_count: number;
            proyek_count: number;
            hasil_penilaian_count: number;
            catatan_wali_kelas_count: number;
            // exists
            user_exists: boolean;
            anggota_kelas_exists: boolean;
            kelas_exists: boolean;
            wilayah_exists: boolean;
            ekskul_exists: boolean;
            proyek_exists: boolean;
            hasil_penilaian_exists: boolean;
            catatan_wali_kelas_exists: boolean;
        }

        export interface Subelemen {
            // columns
            id: number;
            elemen_id: number;
            deskripsi: string;
            // relations
            elemen: Eleman;
            // counts
            // exists
            elemen_exists: boolean;
        }

        export interface Tapel {
            // columns
            id: number;
            tahun: number;
            semester: string;
            tempat_rapor: string | null;
            tanggal_rapor: string | null;
            aktif: boolean;
            created_at: string | null;
            updated_at: string | null;
            // relations
            kelas: Kela[];
            siswa: AnggotaKela[];
            proyek: Proyek[];
            // counts
            kelas_count: number;
            siswa_count: number;
            proyek_count: number;
            // exists
            kelas_exists: boolean;
            siswa_exists: boolean;
            proyek_exists: boolean;
        }

        export interface User {
            // columns
            id: number;
            name: string;
            username: string;
            email: string | null;
            email_verified_at: string | null;
            password?: string;
            avatar: string | null;
            remember_token?: string | null;
            created_at: string | null;
            updated_at: string | null;
            // relations
            siswa: Siswa;
            guru: Guru;
            operator: Operator;
            notifications: DatabaseNotification[];
            // counts
            notifications_count: number;
            // exists
            siswa_exists: boolean;
            guru_exists: boolean;
            operator_exists: boolean;
            notifications_exists: boolean;
        }

        export interface Wilayah {
            // columns
            id: number;
            name: string;
            // relations
            sekolah: Sekolah[];
            guru: Guru[];
            siswa: Siswa[];
            operator: Operator[];
            // counts
            sekolah_count: number;
            guru_count: number;
            siswa_count: number;
            operator_count: number;
            // exists
            sekolah_exists: boolean;
            guru_exists: boolean;
            siswa_exists: boolean;
            operator_exists: boolean;
        }
    }
}
