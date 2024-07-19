import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import {
	FileBrowser,
	FileNavbar,
	FileToolbar,
	FileList,
	FileContextMenu,
	IconFA,
	ExplorerActions,
	defineFileAction,
	IconName
} from '../../../packages/react-file-manager-ctz/src/index';
import files from './files';
import './App.css';
function App() {
	const pathEntries = ['test', 'folder'];
	const myFileActions = [
		ExplorerActions.UploadFiles,
		ExplorerActions.DownloadFiles,
		ExplorerActions.DeleteFiles,
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
		<Box>
			<AppBar position="static">
				<Toolbar variant="dense">
					<Typography variant="h6" color="inherit" component="div">
						React File Explorer
					</Typography>
				</Toolbar>
			</AppBar>

			<Box sx={{ height: '500px', mt: 5, p: 5 }}>
				<FileBrowser
					fileActions={CustomActions}
					iconComponent={IconFA}
					folderChain={pathEntries.map((name, idx) => ({
						id: `${idx}`,
						name,
					}))}
					files={files}
					clearSelectionOnOutsideClick={false}
				>
					{/* <FileNavbar /> */}
					<FileToolbar />
					<FileList />
					<FileContextMenu />
				</FileBrowser>
			</Box>
		</Box>
	);
}

export default App;
