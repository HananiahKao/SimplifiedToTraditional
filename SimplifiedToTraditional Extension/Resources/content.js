console.log("[content.js] script file loaded");
(async () => {
    console.log("[content.js] Starting conversion script");

    try {
        const converter = await OpenCC.Converter({
            from: 'cn',
            to: 'tw'
        });


        console.log("[content.js] Converter initialized successfully");

        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let count = 0;

        while (walk.nextNode()) {
            const node = walk.currentNode;
            if (!node.nodeValue.trim()) continue;

            try {
                const converted = await converter(node.nodeValue);
                if (converted !== node.nodeValue) {
                    node.nodeValue = converted;
                    console.log(`[content.js] Converted text node #${count}`);
                }
            } catch (convError) {
                console.error("[content.js] Conversion error:", convError);
            }

            count++;
        }

        console.log(`[content.js] Conversion finished for ${count} text nodes`);
    } catch (e) {
        console.error("[content.js] Initialization or DOM walking error:", e);
    }
})();
