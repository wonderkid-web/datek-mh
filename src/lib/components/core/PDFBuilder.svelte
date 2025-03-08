<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { logoURI } from '../../../image';

	interface ComputerItem {
		no: number;
		itemName: string;
		specification: string;
		quantity: number;
	}

	interface FormData {
		letterNumber: string;
		letterDate: string;
		subject: string;
		recipient: {
			title: string;
			division: string;
			location: string;
		};
		items: ComputerItem[];
		requester: {
			name: string;
			position: string;
			division: string;
		};
		approver: {
			name: string;
			position: string;
			division: string;
		};
		purpose: string;
	}

	let pdfMake: any;
	let formData: FormData = {
		letterNumber: 'MIS/PROC/2024/002',
		letterDate: '02 Maret 2024',
		subject: 'Pengajuan Pengadaan Perangkat Komputer',
		recipient: {
			title: 'Direktur Keuangan',
			division: 'PT. Mahkota Group, TBK',
			location: 'Jakarta Selatan'
		},
		items: [
			{
				no: 1,
				itemName: 'Desktop PC Workstation',
				specification: 'Intel i7 Gen 13, 32GB RAM, 1TB SSD, RTX 4060',
				quantity: 5
			},
			{
				no: 2,
				itemName: 'Monitor 27"',
				specification: 'IPS Panel, 1440p, 165Hz',
				quantity: 8
			},
			{
				no: 3,
				itemName: 'UPS',
				specification: '1500VA/900W, Pure Sine Wave',
				quantity: 5
			},
			{
				no: 4,
				itemName: 'Network Switch',
				specification: '24-Port Gigabit Managed Switch',
				quantity: 2
			}
		],
		requester: {
			name: 'Kawi Koiman',
			position: 'Head MIS',
			division: 'Management Information System'
		},
		approver: {
			name: 'Nagian Toni',
			position: 'Direktur Utama',
			division: 'BOD'
		},
		purpose:
			'Pengadaan perangkat komputer untuk menunjang operasional divisi MIS dan meningkatkan performa kerja tim dalam pengembangan sistem.'
	};

	let pdfPreviewUrl: string = '';

	onMount(async () => {
		if (browser) {
			const pdfMakeModule = await import('pdfmake/build/pdfmake');
			const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

			pdfMake = pdfMakeModule.default;
			// @ts-ignore
			pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
			generatePDF();
		}
	});

	function generatePDF(): void {
		if (!pdfMake) return;

		const documentDefinition = {
			pageSize: 'A4',
			pageMargins: [40, 120, 40, 40],
			header: {
				margin: [40, 20, 40, 0],
				columns: [
					{
						width: 80,
						image: logoURI,
						fit: [70, 70]
					},
					{
						width: '*',
						text: [
							{ text: 'PT. MAHKOTA GROUP, TBK\n', style: 'headerBold' },
							{ text: 'MANAGEMENT INFORMATION SYSTEM DIVISION (MIS)\n', style: 'header' },
							{ text: 'Gedung Mahkota Tower Lt. 20\n', style: 'address' },
							{ text: 'Jl. Jend. Sudirman Kav. 45-46 Jakarta Selatan 12930\n', style: 'address' },
							{ text: 'Telp. (021) 555-7890 Email: mis@mahkotagroup.com', style: 'address' }
						],
						alignment: 'center'
					}
				]
			},
			content: [
				{
					columns: [
						{
							width: '*',
							text: [
								{ text: `Nomor : ${formData.letterNumber}\n` },
								{ text: `Hal : ${formData.subject}\n` }
							]
						},
						{
							width: '*',
							text: `${formData.letterDate}\n\n`,
							alignment: 'right'
						}
					],
					margin: [0, 20]
				},
				{
					text: [
						'Kepada Yth.\n',
						`${formData.recipient.title}\n`,
						`${formData.recipient.division}\n`,
						`Di ${formData.recipient.location}\n\n`
					]
				},
				{
					text: formData.purpose,
					alignment: 'justify',
					margin: [0, 0, 0, 10]
				},
				{
					text: 'Berikut adalah rincian perangkat yang diajukan:',
					margin: [0, 0, 0, 10]
				},
				{
					table: {
						headerRows: 1,
						widths: ['auto', '*', '*', 'auto'],
						body: [
							[
								{ text: 'No.', style: 'tableHeader' },
								{ text: 'Nama Barang', style: 'tableHeader' },
								{ text: 'Spesifikasi', style: 'tableHeader' },
								{ text: 'Jumlah', style: 'tableHeader' }
							],
							...formData.items.map((item) => [
								item.no,
								item.itemName,
								item.specification,
								item.quantity
							])
						]
					}
				},
				{
					text: '\nDemikian permohonan ini kami sampaikan. Atas perhatian dan persetujuannya, kami ucapkan terima kasih.',
					margin: [0, 10]
				},
				{
					columns: [
						{
							width: '*',
							text: [
								'\nMengajukan,\n',
								`${formData.requester.position}\n`,
								`${formData.requester.division}\n\n\n\n`,
								`${formData.requester.name}`
							],
							alignment: 'center'
						},
						{
							width: '*',
							text: [
								'\nMenyetujui,\n',
								`${formData.approver.position}\n`,
								`${formData.approver.division}\n\n\n\n`,
								`${formData.approver.name}`
							],
							alignment: 'center'
						}
					],
					margin: [0, 20]
				}
			],
			styles: {
				headerBold: {
					fontSize: 16,
					bold: true
				},
				header: {
					fontSize: 14,
					bold: true
				},
				address: {
					fontSize: 10
				},
				tableHeader: {
					bold: true,
					alignment: 'center'
				}
			}
		};

		const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

		pdfDocGenerator.getDataUrl((dataUrl: string) => {
			pdfPreviewUrl = dataUrl;
		});
	}

	function addItem(): void {
		const newNo = formData.items.length + 1;
		formData.items = [
			...formData.items,
			{
				no: newNo,
				itemName: '',
				specification: '',
				quantity: 0
			}
		];
		generatePDF();
	}

	function removeItem(index: number): void {
		formData.items = formData.items.filter((_, i) => i !== index);
		formData.items = formData.items.map((item, i) => ({
			...item,
			no: i + 1
		}));
		generatePDF();
	}

	function updateForm(): void {
		generatePDF();
	}
</script>

<div class="flex  flex-col overflow-auto bg-gray-50 md:flex-row">
	<!-- PDF Preview -->
	<div class="w-full border-r p-4 md:w-1/2">
		<h2 class="mb-4 text-xl font-bold">Preview PDF</h2>
		{#if pdfPreviewUrl}
			<iframe title="PDF Preview" src={pdfPreviewUrl} class="h-[calc(100vh-100px)] w-full"></iframe>
		{/if}
	</div>

	<!-- Form Inputs -->
	<div class="w-full overflow-y-auto p-4 bg-gray-100 md:w-1/2">
		<h2 class="mb-4 text-xl font-bold">Edit Dokumen Pengadaan</h2>

		<div class="space-y-4">
			<div>
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="block py-1 px-2 text-sm font-medium text-gray-700">Nomor Surat</label>
				<input
					type="text"
					bind:value={formData.letterNumber}
					on:change={updateForm}
					class="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="block py-1 px-2 text-sm font-medium text-gray-700">Tanggal</label>
				<input
					type="text"
					bind:value={formData.letterDate}
					on:change={updateForm}
					class="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="block py-1 px-2 text-sm font-medium text-gray-700">Tujuan Pengadaan</label>
				<textarea
					bind:value={formData.purpose}
					on:change={updateForm}
					rows="3"
					class="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				></textarea>
			</div>

			<div class="border-t pt-4">
				<h3 class="mb-2 text-lg font-medium">Penerima</h3>
				<div class="space-y-2">
					<input
						type="text"
						bind:value={formData.recipient.title}
						on:change={updateForm}
						placeholder="Jabatan"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					<input
						type="text"
						bind:value={formData.recipient.division}
						on:change={updateForm}
						placeholder="Divisi"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					<input
						type="text"
						bind:value={formData.recipient.location}
						on:change={updateForm}
						placeholder="Lokasi"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div class="border-t pt-4">
				<h3 class="mb-2 text-lg font-medium">Daftar Barang</h3>
				<div class="space-y-2">
					{#each formData.items as item, i}
						<div class="space-y-2 rounded-lg border p-4">
							<div class="flex gap-2">
								<input
									type="text"
									bind:value={item.itemName}
									on:change={updateForm}
									placeholder="Nama Barang"
									class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
								<input
									type="number"
									bind:value={item.quantity}
									on:change={updateForm}
									placeholder="Jumlah"
									class="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								/>
								<button
									on:click={() => removeItem(i)}
									class="px-2 py-1 text-red-600 hover:text-red-800"
									disabled={formData.items.length === 1}
								>
									✕
								</button>
							</div>
							<input
								type="text"
								bind:value={item.specification}
								on:change={updateForm}
								placeholder="Spesifikasi"
								class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
						</div>
					{/each}
					<button
						on:click={addItem}
						class="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Tambah Barang
					</button>
				</div>
			</div>

			<div class="border-t pt-4">
				<h3 class="mb-2 text-lg font-medium">Pengaju</h3>
				<div class="space-y-2">
					<input
						type="text"
						bind:value={formData.requester.name}
						on:change={updateForm}
						placeholder="Nama"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					<input
						type="text"
						bind:value={formData.requester.position}
						on:change={updateForm}
						placeholder="Jabatan"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					<input
						type="text"
						bind:value={formData.requester.division}
						on:change={updateForm}
						placeholder="Divisi"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</div>

			<div class="border-t pt-4">
				<h3 class="mb-2 text-lg font-medium">Penyetuju</h3>
				<div class="space-y-2">
					<input
						type="text"
						bind:value={formData.approver.name}
						on:change={updateForm}
						placeholder="Nama"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					<input
						type="text"
						bind:value={formData.approver.position}
						on:change={updateForm}
						placeholder="Jabatan"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					<input
						type="text"
						bind:value={formData.approver.division}
						on:change={updateForm}
						placeholder="Divisi"
						class="block py-1 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
