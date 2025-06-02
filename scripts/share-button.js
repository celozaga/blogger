function share() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: 'Check this out:',
        url: window.location.href
      }).then(() => {
        console.log('Shared successfully!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      alert('Sharing is not supported on this browser.');
    }
  }
