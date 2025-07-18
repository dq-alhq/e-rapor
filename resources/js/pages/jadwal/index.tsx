import { buttonStyle, Card, Header, Link } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import { IsAdmin } from '@/lib/middleware';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { IconCalendarCog } from 'hq-icons';

interface Props {
    jadwals: Jadwal[];
    tapel_aktif: model.Tapel;
    kelas: model.Kelas[];
}

interface Pembelajaran {
    id: number;
    kelas: string;
    mapel: string;
}

interface Jadwal {
    id: number;
    jam: number;
    hari: string;
    pembelajaran: Pembelajaran;
}

const hariList = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'SABTU', 'MINGGU'];

export default function Jadwal({ jadwals, tapel_aktif, kelas }: Props) {
    const structuredData: Record<string, Record<number, Record<string, string>>> = {};

    for (const { hari, jam, pembelajaran } of jadwals) {
        const h = hari.toUpperCase();
        if (!structuredData[h]) structuredData[h] = {};
        if (!structuredData[h][jam]) structuredData[h][jam] = {};
        structuredData[h][jam][pembelajaran.kelas] = pembelajaran.mapel;
    }

    return (
        <>
            <Head title="Jadwal Pembelajaran" />
            <div className="flex h-[calc(100dvh-4.1rem)] flex-1 flex-col rounded-xl p-6">
                <Header className="mb-6">
                    <Header.Title>Jadwal Pembelajaran</Header.Title>
                    <Header.Description>
                        Pada Tahun Pelajaran {tapel_aktif.tahun}/{tapel_aktif.tahun + 1} Semester {tapel_aktif.semester}
                    </Header.Description>
                    {IsAdmin() && (
                        <Header.Action>
                            <Link href={route('jadwal.create')} className={buttonStyle({ size: 'sm' })}>
                                <IconCalendarCog />
                                Atur Jadwal
                            </Link>
                        </Header.Action>
                    )}
                </Header>
                <div className="grid">
                    <Card className="rounded-none">
                        <Card.Content className="relative overflow-x-auto **:border-muted-fg">
                            <table className="w-full text-center text-xs">
                                <thead>
                                    <tr className="sticky top-0 z-20 bg-ring backdrop-blur-lg">
                                        <th className="border px-2 py-1">HARI</th>
                                        <th className="border px-2 py-1">JAM</th>
                                        {kelas.map((k) => (
                                            <th key={k.id} className="border px-2 py-1">
                                                {k.nama}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {hariList.map((hari) => {
                                        const jamMap = structuredData[hari] || {};
                                        return Array.from({ length: 8 }, (_, i) => {
                                            const jam = i + 1;
                                            const row = jamMap[jam] || {};
                                            return (
                                                <tr key={`${hari}-${jam}`}>
                                                    {jam === 1 && (
                                                        <td
                                                            rowSpan={8}
                                                            className="rotate-180 border bg-ring align-middle font-semibold backdrop-blur-lg"
                                                            style={{ writingMode: 'vertical-lr' }}
                                                        >
                                                            {hari}
                                                        </td>
                                                    )}
                                                    <td className="border px-2 py-1">{jam}</td>
                                                    {kelas.map((k) => (
                                                        <td key={k.id} className="border px-2 py-1 whitespace-nowrap">
                                                            {row[k.nama] || ''}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        });
                                    })}
                                </tbody>
                            </table>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Jadwal', href: '/jadwal' },
];
Jadwal.layout = (page: React.ReactNode) => <AppLayout children={page} breadcrumbs={breadcrumbs} />;
