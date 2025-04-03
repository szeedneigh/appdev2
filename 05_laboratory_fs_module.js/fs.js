const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (readErr, data) => {
  if (readErr) {
    console.error('Error reading file:', readErr);
  } else {
    console.log('File content:', data);
    
    fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (writeErr) => {
      if (writeErr) {
        console.error('Error creating file:', writeErr);
      } else {
        console.log('newfile.txt created successfully');
        
        fs.appendFile('sample.txt', '\nAppended content.', (appendErr) => {
          if (appendErr) {
            console.error('Error appending content:', appendErr);
          } else {
            console.log('Content appended successfully');
            
            fs.unlink('newfile.txt', (unlinkErr) => {
              if (unlinkErr) {
                console.error('Error deleting file:', unlinkErr);
              } else {
                console.log('newfile.txt deleted successfully');
              }
            });
          }
        });
      }
    });
  }
});
