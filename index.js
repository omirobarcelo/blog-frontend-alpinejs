function state() {
  return {
    darkMode: false,
    posts: [],
    entry: {
      loaded: false,
      data: undefined,
      prevId: null,
      nextId: null
    },
    loadPosts() {
      if (this.posts.length === 0) {
        fetch('http://localhost:8000/posts')
          .then(res => res.json())
          .then(posts => this.posts = posts);
      }
    },
    async loadEntry(id) {
      document.body.style.cursor = 'wait';
      this.entry.data = '<br />';
      fetch(`http://localhost:8000/posts/${id}`, {
          mode: 'cors',
          headers: {
            'Content-Type': 'text/html'
          }
        })
        .then(res => res.text())
        .then(data => {
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
          this.entry = {
            ...this.entry,
            loaded: true,
            data
          };
        })
        .catch(error => console.error(error));
      const entryIdx = this.posts.findIndex(p => p.id === id);
      this.entry.prevId = entryIdx > 0 ? this.posts[entryIdx - 1].id : null;
      this.entry.nextId = entryIdx < this.posts.length - 1 ? this.posts[entryIdx + 1].id : null;
    }
  }
}