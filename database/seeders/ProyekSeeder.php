<?php

namespace Database\Seeders;

use App\Models\AnggotaKelas;
use App\Models\Dimensi;
use App\Models\Elemen;
use App\Models\Proyek;
use App\Models\Subelemen;
use Illuminate\Database\Seeder;

class ProyekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Dimensi::query()->insert([
            ['fase' => 'D', 'deskripsi' => 'Beriman, Bertakwa Kepada Tuhan Yang Maha Esa, dan Berakhlak Mulia'],
            ['fase' => 'D', 'deskripsi' => 'Berkebhinekaan Global'],
            ['fase' => 'D', 'deskripsi' => 'Bergotong-Royong'],
            ['fase' => 'D', 'deskripsi' => 'Mandiri'],
            ['fase' => 'D', 'deskripsi' => 'Bernalar Kritis'],
            ['fase' => 'D', 'deskripsi' => 'Kreatif'],
        ]);

        Elemen::query()->insert([
            ['dimensi_id' => '1', 'deskripsi' => 'Akhlak Beragama'],
            ['dimensi_id' => '1', 'deskripsi' => 'Akhlak Pribadi'],
            ['dimensi_id' => '1', 'deskripsi' => 'Akhlak Kepada Manusia'],
            ['dimensi_id' => '1', 'deskripsi' => 'Akhlak Kepada Alam'],
            ['dimensi_id' => '1', 'deskripsi' => 'Akhlak Bernegara'],
            ['dimensi_id' => '2', 'deskripsi' => 'Mengenal dan menghargai budaya'],
            ['dimensi_id' => '2', 'deskripsi' => 'Komunikasi dan interaksi antar budaya'],
            ['dimensi_id' => '2', 'deskripsi' => 'Refleksi dan bertanggung jawab terhadap pengalaman kebinekaan'],
            ['dimensi_id' => '2', 'deskripsi' => 'Berkeadilan sosial'],
            ['dimensi_id' => '3', 'deskripsi' => 'Kolaborasi'],
            ['dimensi_id' => '3', 'deskripsi' => 'Kepedulian'],
            ['dimensi_id' => '3', 'deskripsi' => 'Berbagi'],
            ['dimensi_id' => '4', 'deskripsi' => 'Pemahaman diri dan situasi yang dihadapi'],
            ['dimensi_id' => '4', 'deskripsi' => 'Regulasi diri'],
            ['dimensi_id' => '5', 'deskripsi' => 'Memperoleh dan memproses informasi dan gagasan'],
            ['dimensi_id' => '5', 'deskripsi' => 'Menganalisis dan mengevaluasi penalaran dan prosedurnya'],
            ['dimensi_id' => '5', 'deskripsi' => 'Refleksi pemikiran dan proses berpikir'],
            ['dimensi_id' => '6', 'deskripsi' => 'Menghasilkan gagasan yang orisinal'],
            ['dimensi_id' => '6', 'deskripsi' => 'Menghasilkan karya dan tindakan yang orisinal'],
            ['dimensi_id' => '6', 'deskripsi' => 'Memiliki keluwesan berpikir dalam mencari alternatif solusi permasalahan'],
        ]);

        Subelemen::query()->insert([
            ['elemen_id' => '1', 'deskripsi' => 'Mengenal dan Mencintai Tuhan Yang Maha Esa'],
            ['elemen_id' => '1', 'deskripsi' => 'Pemahaman Agama/Kepercayaan'],
            ['elemen_id' => '1', 'deskripsi' => 'Pelaksanaan Ritual Ibadah'],
            ['elemen_id' => '2', 'deskripsi' => 'Integritas'],
            ['elemen_id' => '2', 'deskripsi' => 'Merawat diri secara fisik, mental dan spiritual'],
            ['elemen_id' => '3', 'deskripsi' => 'Mengutamakan persamaan dengan orang lain dan menghargai perbedaan'],
            ['elemen_id' => '3', 'deskripsi' => 'Berempati kepada orang lain'],
            ['elemen_id' => '4', 'deskripsi' => 'Memahami Keterhubungan Ekosistem Bumi'],
            ['elemen_id' => '4', 'deskripsi' => 'Menjaga Lingkungan Alam Sekitar'],
            ['elemen_id' => '5', 'deskripsi' => 'Melaksanakan Hak dan Kewajiban sebagai Warga Negara Indonesia'],
            ['elemen_id' => '6', 'deskripsi' => 'Mendalami budaya dan identitas budaya'],
            ['elemen_id' => '6', 'deskripsi' => 'Mengeksplorasi dan membandingkan pengetahuan budaya, kepercayaan, serta praktiknya'],
            ['elemen_id' => '6', 'deskripsi' => 'Menumbuhkan rasa menghormati terhadap keanekaragaman budaya'],
            ['elemen_id' => '7', 'deskripsi' => 'Berkomunikasi antar budaya'],
            ['elemen_id' => '7', 'deskripsi' => 'Mempertimbangkan dan menumbuhkan berbagai perspektif'],
            ['elemen_id' => '8', 'deskripsi' => 'Refleksi terhadap pengalaman kebinekaan'],
            ['elemen_id' => '8', 'deskripsi' => 'Menghilangkan stereotip dan prasangka'],
            ['elemen_id' => '8', 'deskripsi' => 'Menyelaraskan perbedaan budaya'],
            ['elemen_id' => '9', 'deskripsi' => 'Aktif membangun masyarakat yang inklusif, adil, dan berkelanjutan'],
            ['elemen_id' => '9', 'deskripsi' => 'Berpartisipasi dalam proses pengambilan keputusan bersama'],
            ['elemen_id' => '9', 'deskripsi' => 'Memahami peran individu dalam demokrasi'],
            ['elemen_id' => '10', 'deskripsi' => 'Kerja sama'],
            ['elemen_id' => '10', 'deskripsi' => 'Komunikasi untuk mencapai tujuan bersama'],
            ['elemen_id' => '10', 'deskripsi' => 'Saling-ketergantungan positif'],
            ['elemen_id' => '10', 'deskripsi' => 'Koordinasi Sosial'],
            ['elemen_id' => '11', 'deskripsi' => 'Tanggap terhadap lingkungan Sosial'],
            ['elemen_id' => '11', 'deskripsi' => 'Persepsi sosial'],
            ['elemen_id' => '12', 'deskripsi' => 'Berbagi'],
            ['elemen_id' => '13', 'deskripsi' => 'Mengenali kualitas dan minat diri serta tantangan yang dihadapi'],
            ['elemen_id' => '13', 'deskripsi' => 'Mengembangkan refleksi diri'],
            ['elemen_id' => '14', 'deskripsi' => 'Regulasi emosi'],
            ['elemen_id' => '14', 'deskripsi' => 'Penetapan tujuan belajar, prestasi, dan pengembangan diri serta rencana strategis untuk mencapainya'],
            ['elemen_id' => '14', 'deskripsi' => 'Menunjukkan inisiatif dan bekerja secara mandiri'],
            ['elemen_id' => '14', 'deskripsi' => 'Mengembangkan pengendalian dan disiplin diri'],
            ['elemen_id' => '14', 'deskripsi' => 'Percaya diri, tangguh (resilient), dan adaptif'],
            ['elemen_id' => '15', 'deskripsi' => 'Mengajukan pertanyaan'],
            ['elemen_id' => '15', 'deskripsi' => 'Mengidentifikasi, mengklarifikasi, dan mengolah informasi dan gagasan'],
            ['elemen_id' => '16', 'deskripsi' => 'Menganalisis dan mengevaluasi penalaran dan prosedurnya'],
            ['elemen_id' => '17', 'deskripsi' => 'Merefleksi dan mengevaluasi pemikirannya sendiri'],
            ['elemen_id' => '18', 'deskripsi' => 'Menghasilkan gagasan yang orisinal'],
            ['elemen_id' => '19', 'deskripsi' => 'Menghasilkan karya dan tindakan yang orisinal'],
            ['elemen_id' => '20', 'deskripsi' => 'Memiliki keluwesan berpikir dalam mencari alternatif solusi permasalahan'],
        ]);

        Proyek::factory(3)->create(['tapel_id' => 1]);
        Proyek::factory(3)->create(['tapel_id' => 2]);

        $createdProyek = Proyek::query()->get();
        $siswa = AnggotaKelas::query()->get();

        foreach ($createdProyek as $proyek) {
            foreach ($siswa as $s) {
                $proyek->siswa()->attach($s);
            }
        }
    }
}
