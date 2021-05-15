import { appWindow, PhysicalSize } from '@tauri-apps/api/window';

function TitleBar() {
    function handleMaximize() {
        appWindow.isFullscreen()
            .then((result) => appWindow.setFullscreen(!result));
    }

	return (
		 <div className="absolute w-full top-0 flex bg-cyan-500 p-2 space-x-2" data-tauri-drag-region="">
		    <div onClick={() => appWindow.close()}>
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
		    </div>
		    <div  onClick={() => appWindow.minimize()}>
                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
		    </div>
		    <div onClick={() => handleMaximize()}>
                <div class="w-3 h-3 rounded-full bg-green-600"></div>
		    </div>
  		</div>
	);
}

export default TitleBar;
