export default new class {
  constructor() {
    if (localStorage.getItem("books") === null) {
      this.data = {
        nextBookID:8,
        nextFolderID:2,
        folders: [
          {
            name: "no folder",
            folderID: 0,
            books: [
              {
                bookID:0,
                title: "Caste",
                author: "Isabel Wilkerson",
                description: "The Pulitzer Prize–winning, bestselling author of The Warmth of Other Suns examines the unspoken caste system that has shaped America and shows how our lives today are still defined by a hierarchy of human divisions.",
                rating1: 'like',
                rating1: "like",
                rating2: 4
              },
              {
                bookID:4,
                title: "Hamnet",
                author: "Maggie O’Farrell",
                description: "In 1580’s England, during the Black Plague a young Latin tutor falls in love with an extraordinary, eccentric young woman in this “exceptional historical novel” (The New Yorker) and best-selling winner of the Women’s Prize for Fiction.",
                rating1: 'like',
                rating1: "like",
                rating2: 4
              },
              {
                bookID:6,
                title: "The System",
                author: "Robert B. Reich",
                description: "From the best-selling author of The Common Good comes an urgent analysis of how the “rigged” systems of American politics and power operate, how this status quo came to be, and how average citizens can enact change.",
                rating1: 'like',
                rating1: "like",
                rating2: 4
              },
              {
                bookID:7,
                title: "Such a Fun Age",
                author: "Kiley Reid",
                description: "A striking and surprising debut novel from an exhilarating new voice, Such a Fun Age is a page-turning and big-hearted story about race and privilege, set around a young black babysitter, her well-intentioned employer, and a surprising connection that threatens to undo them both.",
                rating1: 'like',
                rating1: "like",
                rating2: 4
              }
            ]
          },
          {
            name: "folder",
            folderID: 1,
            books: [
              {
                bookID:1,
                title: "Dear Edward",
                author: "Ann Napolitano",
                description: "Dear Edward is at once a transcendent coming-of-age story, a multidimensional portrait of an unforgettable cast of characters, and a breathtaking illustration of all the ways a broken heart learns to love again.",
                rating1: 'like',
                rating1: "like",
                rating2: 4
              },
              {
                bookID:2,
                title: "Untamed",
                author: "Glennon Doyle",
                description: "In her most revealing and powerful memoir yet, the activist, speaker, bestselling author, and “patron saint of female empowerment” (People) explores the joy and peace we discover when we stop striving to meet others’ expectations and start trusting the voice deep within us.",
                rating1: 'like',
                rating1: "like",
                rating2: 4
              },
              {
                bookID:5,
                title: "The Splendid and the Vile",
                author: "Erik Larson",
                description: "The author of The Devil in the White City and Dead Wake delivers an intimate chronicle of Winston Churchill and London during the Blitz—an inspiring portrait of courage and leadership in a time of unprecedented crisis.",
                rating1: 'like',
                rating1: "like",
                rating2: 4
              }
            ]
          }
        ]
      }
      this.save()
    
      this.get();
    }
    else {
      this.get()
    }
    window.onbeforeunload = () => {
      this.save()
    };
  }
  save() {
    localStorage.setItem("books", JSON.stringify(this.data))
    this.data = JSON.parse(localStorage.getItem("books"));
  }

  get() {
    this.data = JSON.parse(localStorage.getItem("books"))
  }

  delete_folder(index) {
    this.data.folders.splice(index, 1)
  }

  add_folder(name) {
    this.data.folders.push({
      folderID: this.data.nextFolderID,
      name: name,
      books: []
    })
    this.data.nextFolderID += 1
  }


  delete_book(folderID, bookID) {
    let folderIndex = this.data.folders.findIndex(item => item.folderID == folderID)
    if (folderIndex != -1){
      let bookIndex = this.data.folders[folderIndex].books.findIndex(item => item.bookID == bookID)
      if(bookIndex != -1){
        this.data.folders[folderIndex].books.splice(bookIndex, 1)
      }
    }
  }

  add_book(folderID, book){
    let folderIndex = this.data.folders.findIndex(item => item.folderID == folderID)
    let data = {
      bookID: this.data.nextBookID,
      ...book
    }
    this.data.folders[folderIndex].books.push(
      data
    )
    this.data.nextBookID += 1
    return data
  }

  move_book(fromFolderID, toFolderID, book){
    this.add_book(toFolderID, book)
    this.delete_book(fromFolderID, book.bookID)
  }