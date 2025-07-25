 (async () => {
   const dictURL = chrome.runtime.getURL("dict/s2t.json");
   const converter = await OpenCC.Converter({ from: dictURL });

   const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
   while (walk.nextNode()) {
     const node = walk.currentNode;
     const converted = await converter(node.nodeValue);
     node.nodeValue = converted;
   }
 })();
