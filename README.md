### Dev notes
nc -u Execution policy was restricted \
As a windows user pleb ... I had to admin into powershell then cd
into /Users/phill/ to set Execution policy from restricted to unrestricted

DEBUG=myapp:* npm start \
This command on windows is next to level impossible with numerous google
resources suggesting a different command with an '&' ampersand which was
already reserved by **** windows****. The right command was eventually
found on express website itself.

Realizing that Panter used liquid express to shape out his website the
way he did with little boby drop tables, I am engaging liquidJS tutorials.

### Usage
mkdir myapp cd myapp \ npm init \ entry point: (index.js) \ npm install express \
npx express-generator --view=pug \
npm i -g npm-check-updates \
ncu -u to update every version \
npm install \
npm install sqlite3 \
npm install liquidjs\
npm install express-validator\
\
[localhost:3000](http://localhost:3000) \
$env:DEBUG='myapp:*'; npm start






