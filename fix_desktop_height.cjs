const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /\{deviceMode === "iphone" \? renderIphoneLayout\(\) : deviceMode === "ipad" \? renderIpadLayout\(\) : renderDesktopLayout\(\)\}/,
  `{deviceMode === "iphone" ? renderIphoneLayout() : deviceMode === "ipad" ? renderIpadLayout() : (
    <div className="h-screen w-full bg-[#030712] overflow-hidden">
      {renderDesktopLayout()}
    </div>
  )}`
);

fs.writeFileSync('src/App.tsx', content);
