import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import {
	FileBrowser,
	FileNavbar,
	FileToolbar,
	FileList,
	FileContextMenu,
	IconFA,
	ExplorerActions
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
					fileActions={myFileActions}
					iconComponent={IconFA}
					folderChain={pathEntries.map((name, idx) => ({
						id: `${idx}`,
						name,
					}))}
					files={files}
				>
					<FileNavbar />
					<FileToolbar />
					<FileList />
					<FileContextMenu />
				</FileBrowser>
			</Box>
		</Box>
	);
}

export default App;
