const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  audio: [{
    name: 'persona', // 音频名称
    artist: 'Xeuphoria,OneChilledPanda', // 音频作者
    url: '../../bgm/persona - Xeuphoria,OneChilledPanda-compressed.mp3',
    cover: '../../bgm/cover.webp'
  }], // 这里加载您的音频配置
});