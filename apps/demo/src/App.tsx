import { AppBar, Box, Chip, styled, Toolbar, Typography } from '@mui/material';
import {
	FileBrowser,
	// FileNavbar,
	FileToolbar,
	FileList,
	FileContextMenu,
	IconFA,
	ExplorerActions,
	defineFileAction,
	IconName,
	FileNavbar,
} from '../../../packages/react-file-manager-ctz/src/index';
import files from './files';
import './App.css';

const FileViewerContainer = styled(Box)(() => ({
	height: '100vh',
	width: '100vw',
	overflow: 'hidden'
}))

function App() {
	const pathEntries = [
		{
			"id": "0",
			"name": "My Drive",
			"isDir": true
		},
		{
			"isDir": true,
			"id": "82df8054-099b-4d4d-a2a3-8f70f97e00ae",
			"name": "newone",
			"slug": "newone",
			"parentId": null,
			"folderPath": "newone",
			"sftpId": null,
			"ext": null,
			"size": "10060073",
			"maxSize": "7516192768",
			"description": "dwg viewer test",
			"remarks": null,
			"status": 1,
			"folderState": "ready",
			"isPublish": 1,
			"createdBy": "13e2e195-72df-4bf7-b690-71d22dc1b587",
			"updatedBy": "13e2e195-72df-4bf7-b690-71d22dc1b587",
			"createdAt": "2025-01-06T04:51:56.835Z",
			"updatedAt": "2025-02-27T08:18:39.410Z",
			"deletedAt": null
		},
		{
			"isDir": true,
			"id": "0c8fea63-1741-412f-8ae9-9c10bc79ea91",
			"name": "newone",
			"slug": "newone",
			"parentId": "82df8054-099b-4d4d-a2a3-8f70f97e00ae",
			"folderPath": "newone\\newone",
			"sftpId": null,
			"ext": null,
			"size": "9961769",
			"maxSize": "0",
			"description": "dwg viewer test",
			"remarks": null,
			"status": 1,
			"folderState": "ready",
			"isPublish": 1,
			"createdBy": "13e2e195-72df-4bf7-b690-71d22dc1b587",
			"updatedBy": "13e2e195-72df-4bf7-b690-71d22dc1b587",
			"createdAt": "2025-01-06T04:52:24.924Z",
			"updatedAt": "2025-02-27T08:18:39.405Z",
			"deletedAt": null
		},
		// {
		// 	"isDir": true,
		// 	"id": "60b8f62f-9933-4f35-a2fd-decacce25737",
		// 	"name": "newfolder",
		// 	"slug": "newfolder",
		// 	"parentId": "0c8fea63-1741-412f-8ae9-9c10bc79ea91",
		// 	"folderPath": "newone\\newone\\newfolder",
		// 	"sftpId": null,
		// 	"ext": null,
		// 	"size": "1562",
		// 	"maxSize": "0",
		// 	"description": "",
		// 	"remarks": null,
		// 	"status": 1,
		// 	"folderState": "ready",
		// 	"isPublish": 1,
		// 	"createdBy": "13bdc64a-bda4-4ea2-a258-2c3f714832ee",
		// 	"updatedBy": "13bdc64a-bda4-4ea2-a258-2c3f714832ee",
		// 	"createdAt": "2025-02-27T08:11:53.306Z",
		// 	"updatedAt": "2025-02-27T08:18:39.392Z",
		// 	"deletedAt": null
		// }
	];
	const myFileActions = [
		// defineFileAction({
		// 	id: 'create_folder',	
		// 	requiresSelection: false,
		// 	hotkeys: [],
		// 	button: {
		// 		name: 'Create New',
		// 		toolbar: true,
		// 		contextMenu: false,
		// 		tooltip: 'Create New',
		// 		dropdown: false,
		// 		icon: IconName.folderCreate,
		// 	},
		// }),
		// ExplorerActions.UploadFiles,
		// ExplorerActions.DownloadFiles,
		// ExplorerActions.DeleteFiles,
		defineFileAction({
			id: 'filter',
			button: {
				name: 'Filter',
				toolbar: true,
				group: 'Options',
				icon: 'filter',
			},
		}),

		defineFileAction({
			id: 'preview',
			requiresSelection: true,
			button: {
				name: 'Preview',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				groupType: 'access',
				icon: IconName.star,
			},
		}),
		defineFileAction({
			id: 'open_width',
			requiresSelection: true,
			button: {
				name: 'Open Width',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				groupType: 'access',
				icon: IconName.star,
				dropdown: true,
				dropdownItem: [
					{
						icon: IconName.copy,
						label: 'Desktop App',
					},
					{
						icon: IconName.copy,
						label: 'Open in new tab',
					},
				],
			},
		}),
		defineFileAction({
			id: 'star_file',
			requiresSelection: true,
			button: {
				name: 'Add to Starred',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				groupType: 'filehandle',
				icon: IconName.star,
				dropdown: true,
				dropdownItem: [
					{
						icon: IconName.copy,
						label: 'Desktop App',
					},
					{
						icon: IconName.copy,
						label: 'Open in new tab',
					},
				],
			},
		}),

		defineFileAction({
			id: 'create_folder',
			requiresSelection: false,
			hotkeys: [],
			button: {
				name: 'Create New',
				toolbar: true,
				contextMenu: false,
				groupType: 'filehandle',
				tooltip: 'Create New',
				dropdown: false,
				icon: IconName.folderCreate,
			},
		}),
		defineFileAction({
			id: 'delete_files',
			requiresSelection: true,
			hotkeys: ['delete'],
			button: {
				name: 'Delete',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				groupType: 'filehandle',
				tooltip: 'Delete',
				dropdown: true,
				icon: IconName.trash,
			},
		}),
		defineFileAction({
			id: 'rename_files',
			requiresSelection: true,
			button: {
				name: 'Rename',
				toolbar: true,
				contextMenu: true,
				groupType: 'filehandle',
				group: 'Actions',
				icon: IconName.copy,
			},
		}),
		defineFileAction({
			id: 'copy_files',
			requiresSelection: true,
			button: {
				name: 'Copy To...',
				toolbar: true,
				contextMenu: true,
				groupType: 'filehandle',
				group: 'Actions',
				icon: IconName.copy,
			},
		}),
		defineFileAction({
			id: 'download_files',
			requiresSelection: true,
			button: {
				name: 'Download',
				toolbar: true,
				contextMenu: true,
				groupType: 'filehandle',
				group: 'Actions',
				icon: IconName.download,
			},
		}),
		defineFileAction({
			id: 'move_files',
			requiresSelection: true,
			button: {
				name: 'Move To...',
				toolbar: true,
				contextMenu: true,
				groupType: 'filehandle',
				group: 'Actions',
				icon: IconName.copy,
			},
		}),
		defineFileAction({
			id: 'share_files',
			requiresSelection: true,
			button: {
				name: 'Share',
				toolbar: true,
				contextMenu: true,
				groupType: 'filehandle',
				group: 'Actions',
				icon: IconName.share,
			},
		}),
		defineFileAction({
			id: 'star_file',
			requiresSelection: true,
			button: {
				name: 'Add to Starred',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				icon: IconName.star,
			},
		}),
		defineFileAction({
			id: 'run_ocr',
			requiresSelection: true,
			button: {
				name: 'Run Ocr',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				icon: IconName.search,
			},
		}),
		defineFileAction({
			id: 'run_convert',
			requiresSelection: true,
			button: {
				name: 'Run Convert',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				icon: IconName.config,
			},
		}),
		defineFileAction({
			id: 'properties',
			button: {
				name: 'Properties',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				icon: IconName.upload,
			},
		}),

		defineFileAction({
			id: 'upload_files',
			button: {
				name: 'Upload',
				toolbar: true,
				icon: IconName.upload,
			},
		}),
	];
	const CustomActions = [{
		DeleteFiles: defineFileAction({
			id: 'delete_files',
			requiresSelection: true,
			hotkeys: ['delete'],
			button: {
				name: 'Delete',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				tooltip: 'Delete',
				dropdown: true,
				icon: IconName.trash,
			},
		}),
		RenameFiles: defineFileAction({
			id: 'rename_files',
			requiresSelection: true,
			button: {
				name: 'Rename',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				icon: IconName.copy,
			},
		}),
		CopyFiles: defineFileAction({
			id: 'copy_files',
			requiresSelection: true,
			button: {
				name: 'Copy To...',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				icon: IconName.copy,
			},
		}),
		MoveFiles: defineFileAction({
			id: 'move_files',
			requiresSelection: true,
			button: {
				name: 'Move To...',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				icon: IconName.folder,
			},
		}),
		ShareFiles: defineFileAction({
			id: 'share_files',
			requiresSelection: true,
			button: {
				name: 'Share',
				toolbar: true,
				contextMenu: true,
				group: 'Actions',
				icon: IconName.share,
			},
		}),
		UploadFiles: defineFileAction({
			id: 'upload_files',
			button: {
				name: 'Upload',
				toolbar: true,
				icon: IconName.upload,
			},
		}),
	}];

	return (
		<FileViewerContainer>
			<FileBrowser
				// darkMode={true}
				fileActions={myFileActions}
				iconComponent={IconFA}
				folderChain={pathEntries.map((name, idx) => ({
					id: `${idx}`,
					name: `${name.name}`,
				}))}
				files={files.map((f) => ({
					...f,
					modDate: f.updatedAt,
					size: f.isDir ? '' : parseInt(f.size || 0, 10),
				}))}
				clearSelectionOnOutsideClick={false}
				// defaultFileViewActionId='enable_grid_view'
				defaultFileViewActionId="enable_list_view"
				listCols={[
					{ label: 'Cabinet Size', getValue: (item) => 0 },
					{ label: 'MetaData', getValue: (item) => <Chip label="Yes" color="primary" size="small" /> },
				]}
			>
				<FileToolbar />
				<FileList />
				<FileContextMenu />
			</FileBrowser>
		</FileViewerContainer>
	);
}

export default App;
