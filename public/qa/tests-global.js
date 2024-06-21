suite("Global Tests", function () {
  test("page has a valid title", function () {
    var title = document.title.trim(); // Trim any leading or trailing whitespace
    
    assert(
      title.length > 0 && // Check if title is not empty
      /\S/.test(title) && // Check if title contains non-whitespace characters
      title.toUpperCase() !== "TODO"
    );
  });
});

