window.onload = function(){
   //播放暂停的按钮
		//playBln 控制播放暂停的布尔值
		var playBtn = document.querySelector('.playNode'),
		playBln = true,
		//控制声音的按钮
		//volumeBln 控制声音的布尔值
		volumeNode = document.querySelector('.volumeNode'),
		volumeBln = true,
		//进度条的选择器
		trueLine = document.querySelector('.trueLine'),
		//进度条外层的元素
		progressNode = document.querySelector('.progressNode'),
		//最外层元素
		outerNode = document.querySelector('.outerNode'),
		//选择一下封面背景
		topNode = document.querySelector('.topNode'),
		//下一首歌的按钮
		nextNode = document.querySelector('.nextNode'),
		//上一首歌的按钮
		lastNode = document.querySelector('.lastNode'),
		//音乐名称
		musicName = document.querySelector('.musicName');

		//给播放器添加js
		//创建audio对象
		var myAudio = new Audio();
		//给audio对象一个 src
		//所有的数据存在数组里面
		let allMusic = [{
			'MusicSrc':'music/mus/AcousticGuitar1.mp3',
			'MusicPic':'music/pic/fmt01.jpg',
			'MusicName':'AcousticGuitar1'
		},{
			'MusicSrc':'music/mus/AmazingGrace.mp3',
			'MusicPic':'music/pic/fmt02.png',
			'MusicName':'AmazingGrace'

		},{
			'MusicSrc':'music/mus/FeelsGood2B.mp3',
			'MusicPic':'music/pic/fmt03.jpg',
			'MusicName':'FeelsGood2B'

		},{
			'MusicSrc':'music/mus/FunBusyIntro.mp3',
			'MusicPic':'music/pic/fmt04.jpg',
			'MusicName':'FunBusyIntro'

		},{
			'MusicSrc':'music/mus/GreenDaze.mp3',
			'MusicPic':'music/pic/fmt05.jpg',
			'MusicName':'GreenDaze'

		},{
			'MusicSrc':'music/mus/Limosine.mp3',
			'MusicPic':'music/pic/fmt06.jpg',
			'MusicName':'Limosine'

		}],Index = 0;
		myAudio.src = allMusic[Index].MusicSrc;

		//给封面赋值
		topNode.style.backgroundImage = 'url('+allMusic[Index].MusicPic+')';

		//给音乐名称
		musicName.innerHTML = allMusic[Index].MusicName;

		//谷歌浏览器不允许直接play
		//myAudio.play();
		

		//播放暂停的事件
		playBtn.onclick = function(){
			//myAudio.play();
			playBln = !playBln;
			if(playBln == false){
				myAudio.play();
			}
			else{
				myAudio.pause();
			}
		};

		//声音的事件
		volumeNode.onclick = function(){
			volumeBln = !volumeBln;
			if(volumeBln == false){
				myAudio.volume = 0;
				this.className = 'no_volumeNode';
			}
			else{
				myAudio.volume = 1;
				this.className = 'volumeNode';
			}
		};

		//播放时 进度条的长度控制计算
		myAudio.addEventListener('timeupdate',function(){
			trueLine.style.width = myAudio.currentTime / myAudio.duration * 100 + '%';
		});

		//点击progressNode元素 让进度条直接到达这个位置
		progressNode.onclick = function(e){
			var ev = e || event;
			//算法 就是 算出 点击的位置 在 外层进度条的 多少像素

			//需要一个鼠标坐标点 减去 外层元素的 offsetLeft 和 最外层元素的offsetLeft 


			//console.log((ev.clientX - (this.offsetLeft + outerNode.offsetLeft))/this.offsetWidth)

			// 320秒 *  0.50 = 160秒
			myAudio.currentTime = myAudio.duration * ((ev.clientX - (this.offsetLeft + outerNode.offsetLeft))/this.offsetWidth);

			trueLine.style.width = ((ev.clientX - (this.offsetLeft + outerNode.offsetLeft))/this.offsetWidth) * 100 + '%';

		};

		//下一首歌的事件
		nextNode.onclick = function(){
			Index ++;
			if(Index == allMusic.length){
				Index = 0;
			}
			MusicPlayFn();
		};
		//音乐播放的函数
		function MusicPlayFn(){
			myAudio.src = allMusic[Index].MusicSrc;
			myAudio.currentTime = 0;
			trueLine.style.width = '0%';
			if(playBln == false){
				myAudio.play();
			}
			else{
				myAudio.pause();
			}

			//给封面赋值
			topNode.style.backgroundImage = 'url('+allMusic[Index].MusicPic+')';
			//给音乐名称
			musicName.innerHTML = allMusic[Index].MusicName;
		}

		//上一首歌的点击事件
		lastNode.onclick = function(){
			Index --;
			if(Index == -1){
				Index = allMusic.length-1;
			}
			MusicPlayFn();
		};
}