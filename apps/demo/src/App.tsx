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
} from '../../../packages/react-file-manager-ctz/src/index';
import files from './files';
import './App.css';

const FileViewerContainer = styled(Box)(()=>({
    height: '100vh',
	width: '100%',
}))

function App() {
	const pathEntries = ['test', 'folder'];
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
				groupType: 'filemanage',
				icon: IconName.star,
			},
		}),
	];
	const CustomActions = {
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
	};

	return (
		<FileViewerContainer>
			<FileBrowser
				// darkMode={true}
				fileActions={myFileActions}
				iconComponent={IconFA}
				folderChain={pathEntries.map((name, idx) => ({
					id: `${idx}`,
					name,
				}))}
				files={files.map((f) => ({
					...f,
					modDate: f.updatedAt,
					size: f.isDir ? '' : parseInt(f.size || 0, 10),
				}))}
				clearSelectionOnOutsideClick={false}
				// defaultFileViewActionId='enable_grid_view'
				defaultFileViewActionId="enable_list_view"
			// listCols={[
			// 	{ label: 'Cabinet Size', getValue: (item) => 0 },
			// 	{ label: 'MetaData', getValue: (item) => <Chip label="Yes" color="primary" size="small" /> },
			// ]}
			>
				{/* <FileNavbar /> */}
				{/* <FileToolbar /> */}
				<FileList />
				<FileContextMenu />
			</FileBrowser>
		</FileViewerContainer>
	);
}

export default App;
