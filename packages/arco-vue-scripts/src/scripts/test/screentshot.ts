// import playwright from 'playwright';
// import path from 'path';
//
// export default async (domain: string, outDir: string) => {
//   const _domain = domain || 'http://localhost:2233'; // --domain=https://a.b.com
//
//   const componentFlag = '/component/';
//   const baseURL = `${_domain}/vue`;
//   const outDirectory = path.resolve(process.cwd(), outDir);
//   const browser = await playwright.chromium.launch({
//     args: ['--font-render-hinting=none'],
//   });
//   const page = await browser.newPage({
//     viewport: {
//       width: 1440,
//       height: 1340,
//     },
//   });
//
//   await page.goto(`${baseURL}`);
//   await page.waitForLoadState('networkidle');
//
//   const components = page.locator(
//     `.aside-nav-item a[href*="${componentFlag}"]`
//   );
//   const componentCount = await components.count();
//
//   // ['/vue/component/button', '/vue/component/xxx']
//   const componentNames: string[] = await Promise.all(
//     [...Array(componentCount)].map(async (_, index) => {
//       const item = components.nth(index);
//       const href = await item.getAttribute('href');
//       return href?.split(componentFlag).pop() || '';
//     })
//   );
//   let total = 0;
//
//   const genComponentScreenshots = async (componentName?: string) => {
//     if (componentName) {
//       // eslint-disable-next-line
//       const name = componentName
//         .replace(/([A-Z])/g, '-$1')
//         .toLowerCase()
//         .replace('-', '');
//       await page.goto(`${baseURL}${componentFlag}${name}`);
//
//       await page.waitForLoadState('networkidle');
//       const demos = page.locator('.code-block');
//       const totalElements = await demos.count();
//
//       total += totalElements;
//
//       await Promise.all(
//         [...Array(totalElements)].map(async (_, index) => {
//           const demo = demos.nth(index);
//           const id = await demo.getAttribute('id');
//
//           await demo.locator('.cell-demo').screenshot({
//             animations: 'disabled',
//             path: `${outDirectory}/${componentName}/${id}.png`,
//             type: 'png',
//           });
//         })
//       );
//       // eslint-disable-next-line
//       console.log(
//         `[${
//           componentCount - componentNames.length
//         }/${componentCount}]: ${componentName} (${totalElements})`
//       );
//     }
//     if (componentNames.length) {
//       genComponentScreenshots(componentNames.pop());
//     } else {
//       // eslint-disable-next-line
//       console.log('end________', total);
//       await browser.close();
//       process.exit(0);
//     }
//   };
//
//   genComponentScreenshots(componentNames.pop());
// };
