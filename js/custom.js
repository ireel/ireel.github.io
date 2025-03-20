document.addEventListener('DOMContentLoaded', () => {
    const animateController = () => {
      const items = document.querySelectorAll('.recent-post-item:not(.observed)');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // 双向触发：进入时添加visible，离开时移除visible
          entry.target.classList.toggle('visible', entry.isIntersecting);
          
          // 标记已观测（防止重复绑定）
          if (!entry.target.classList.contains('observed')) {
            entry.target.classList.add('observed');
          }
        });
      }, { 
        threshold: 0.7, // 当元素10%进入视口时触发
        rootMargin: '0px 0px -100px 0px' // 底部提前50px触发离开检测
      });
  
      items.forEach(item => observer.observe(item));
    }
  
    // 初始化
    animateController();
    
    // Pjax兼容处理
    document.addEventListener('pjax:complete', () => {
      // 先移除旧观测
      document.querySelectorAll('.recent-post-item.observed').forEach(item => {
        item.classList.remove('visible', 'observed');
      });
      // 重新初始化
      animateController();
    });
  });