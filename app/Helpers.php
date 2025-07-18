<?php

use Carbon\Carbon;

if (!function_exists('toast')) {
    function toast($message, $type = 'success'): void
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}

if (!function_exists('welcome')) {
    function welcome(): string
    {
        // Set the time zone to your local time zone (e.g., "Asia/Jakarta")
        $date = Carbon::now(config('app.timezone', 'Asia/Jakarta'));

        // Determine the greeting based on the current time
        $hour = $date->hour;
        if ($hour >= 0 && $hour < 12) {
            $greeting = "Selamat Pagi";
        } elseif ($hour >= 12 && $hour < 15) {
            $greeting = "Selamat Siang";
        } elseif ($hour >= 15 && $hour < 18) {
            $greeting = "Selamat Sore";
        } else {
            $greeting = "Selamat Malam";
        }

        // Return the greeting HTML
        return $greeting;
    }
}

if (!function_exists('formatHariTanggal')) {
    function formatHariTanggal(): string
    {
        $date = Carbon::now(config('app.timezone', 'Asia/Jakarta'));

        $dayNames = [
            0 => "Minggu",
            1 => "Senin",
            2 => "Selasa",
            3 => "Rabu",
            4 => "Kamis",
            5 => "Jumat",
            6 => "Sabtu"
        ];
        $monthNames = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember"
        ];

        $day = $dayNames[$date->dayOfWeek];
        $daym = $date->day;
        $month = $monthNames[$date->month - 1];
        $year = $date->year;

        // Return the formatted date HTML
        return "{$day}, {$daym} {$month} {$year}";
    }
}

if (!function_exists('terbilang')) {
    function terbilang($number): string
    {
        $number = abs($number);
        $words = [
            "",
            "satu",
            "dua",
            "tiga",
            "empat",
            "lima",
            "enam",
            "tujuh",
            "delapan",
            "sembilan",
            "sepuluh",
            "sebelas"
        ];

        $result = "";

        if ($number < 12) {
            $result = $words[$number];
        } elseif ($number < 20) {
            $result = $words[$number - 10] . " belas";
        } elseif ($number < 100) {
            $result = $words[(int)($number / 10)] . " puluh " . terbilang($number % 10);
        } elseif ($number < 200) {
            $result = "seratus " . terbilang($number - 100);
        } elseif ($number < 1000) {
            $result = $words[(int)($number / 100)] . " ratus " . terbilang($number % 100);
        } elseif ($number < 2000) {
            $result = "seribu " . terbilang($number - 1000);
        } elseif ($number < 1000000) {
            $result = terbilang((int)($number / 1000)) . " ribu " . terbilang($number % 1000);
        } elseif ($number < 1000000000) {
            $result = terbilang((int)($number / 1000000)) . " juta " . terbilang($number % 1000000);
        } elseif ($number < 1000000000000) {
            $result = terbilang((int)($number / 1000000000)) . " milyar " . terbilang($number % 1000000000);
        } elseif ($number < 1000000000000000) {
            $result = terbilang((int)($number / 1000000000000)) . " triliun " . terbilang($number % 1000000000000);
        }

        return ucfirst(trim($result));
    }
}

if (!function_exists('formatTanggal')) {
    function formatTanggal($date): string
    {
        // Pastikan tanggal valid
        if (!$date) {
            return '-';
        }

        // Daftar nama bulan dalam bahasa Indonesia
        $bulan = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember',
        ];

        // Pisahkan tanggal menjadi hari, bulan, dan tahun
        $dateObj = date_create($date);
        $date = date_format($dateObj, 'd');
        $monthIndex = date_format($dateObj, 'n');
        $year = date_format($dateObj, 'Y');

        // Format tanggal
        return "{$date} {$bulan[$monthIndex]} {$year}";
    }
}

if (!function_exists('formatRupiah')) {
    function formatRupiah($number): string
    {
        return "Rp " . number_format($number, 2, ',', '.');
    }
}

if (!function_exists('removeGelar')) {
    function removeGelar(string $string): string
    {
        return str($string)
            ->replace(['Drs.', 'Dr.', 'Prof.', 'dr.', 'drg.', 'dra.', 'Gr.', 'Ns.', 'Bdn.', 'Ir.'], '')
            ->trim()
            ->split('/,/')[0];
    }
}

if (!function_exists('tapelAktif')) {
    function tapelAktif(): int
    {
        return \App\Models\Tapel::query()->where('aktif', true)->first()->id;
    }
}

if (!function_exists('opsiTingkat')) {
    function opsiTingkat(): array
    {
        $jenjang = \App\Models\Sekolah::query()->first()->jenjang;
        $opsiTingkat = [];
        switch ($jenjang) {
            case 'SD/MI':
                $opsiTingkat = [1, 2, 3, 4, 5, 6];
                break;
            case 'SMP/MTs':
                $opsiTingkat = [7, 8, 9];
                break;
            case 'SMA/MA/SMK':
                $opsiTingkat = [10, 11, 12];
                break;
        }
        return $opsiTingkat;
    }
}
if (!function_exists('opsiAngkatan')) {
    function opsiAngkatan(): array
    {
        $tahun_sekarang = \App\Models\Tapel::find(tapelAktif())->tahun;
        return [
            $tahun_sekarang - 2,
            $tahun_sekarang - 1,
            $tahun_sekarang,
        ];
    }
}

if (!function_exists('hapusFile')) {
    function hapusFile(string $path): int
    {
        return file_exists(storage_path('app/private/' . $path)) && unlink(storage_path('app/private/' . $path));
    }
}


if (!function_exists('cekAksesKelas')) {
    function cekAksesKelas(\App\Models\Kelas $kelas): void
    {
        $authorize = auth()->user()->isOperator() || auth()->user()->guru->isMengajarKelas($kelas);
        abort_if(!$authorize, 403, 'Anda tidak memiliki akses untuk Kelas ini.');
    }
}

if (!function_exists('cekAksesMapel')) {
    function cekAksesMapel(\App\Models\Mapel $mapel): void
    {
        $authorize = auth()->user()->isOperator() || auth()->user()->guru->isMengajarMapel($mapel);
        abort_if(!$authorize, 403, 'Anda tidak memiliki akses untuk Mapel ini.');
    }
}
