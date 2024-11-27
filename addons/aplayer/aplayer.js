const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  volume: 0.2,
  audio: [
    {
      name: '旅人の唄',
      artist: '大原ゆい子',
      url: '../../bgm/旅人の唄 - 大原ゆい子.mp3',
      cover: '../../bgm/cover.webp'
    }, {
      name: '目覚めの唄',
      artist: '大原ゆい子',
      url: '../../bgm/目覚めの唄 - 大原ゆい子.mp3',
      cover: '../../bgm/cover.webp'
    }
  ], // 这里加载您的音频配置
});