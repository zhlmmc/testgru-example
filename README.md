Forget about Unit Test, you get covered automatically.

This is the example repo for Test Gru.
Test Gru will help you add unit test automatically. [Here is the video to show how Test Gru works](https://www.youtube.com/watch?v=42B-JwLEohM).

Test gru is still in testing phase.
If you have any question, please connect to us:
connect@gru.ai,or join our [discord](https://discord.gg/jGNWxZbCXs).  

Currently, Test Gru only supports Node.js/TypeStript. We are gradually adding support for other languages.

# Creat Test Gru Account
Log in at [Gru.ai](https://gru.ai). Test Gru currently only supports use with GitHub accounts. You need a GitHub account to log in to gru.ai.

![image](https://github.com/user-attachments/assets/79d337d2-21e4-4067-b1fd-a0eb48709976)

![image](https://github.com/user-attachments/assets/47d87154-5fa6-4de0-b56a-f7ee1f56e651)
# Enter Test Gru
Click the top left corner to select [Test Gru](https://gru.ai/:test).

![image](https://github.com/user-attachments/assets/b86cc641-de39-4993-a302-60daad6ccca3)

# Install Github Application
Follow the steps to install Test Gru.

![image](https://github.com/user-attachments/assets/f1137208-b617-400d-92cb-1c5406d561f1)
![image](https://github.com/user-attachments/assets/4842701d-a3b6-4193-89cf-201d0ed6b1d4)
Then select a repo, perform the configuration.
![image](https://github.com/user-attachments/assets/9849d812-57d3-48f3-86de-ee2427d88e49)
![image](https://github.com/user-attachments/assets/3a9688d8-f513-4612-8546-28101669387d)

# Use Example For Quick Start
1. Fork [this repo](https://github.com/gru-agent/testgru-example) 
2. Install App and get configuration from code repo
![image](https://github.com/user-attachments/assets/ab49cc2f-c146-42f9-a056-60519aac2fbc)
3. dispatch src/user.ts
![image](https://github.com/user-attachments/assets/8daf5a66-b4db-4d3c-b613-2f1f823e0397)
4. Test Gru submits a PR
![image](https://github.com/user-attachments/assets/bed72345-3730-4b44-985c-466111edde3b)

# grutest.yaml 
Configuration file example

```
version: "0.1"
global:
  setup:
    - npm install
pipeline:
  runTest:
    // If your project uses ESLint and Prettier, you can configure the pre-stage here.
    // pre:
    //    - npx eslint --fix {{sourceFilePath}} 
    //    - npx prettier {{sourceFilePath}} --write
    exec:
       - npx vitest run {{testFilePath}}
    // If your project has certain requirements for the final submitted code, you can configure the post-stage here.
    // post:
    //   - npm run lint
    //   - npx tsc --noEmit
settings:
  // IF you allow TestGru to add export to your source code classes or functions when it needs to test your source code
  exportFunctionOrClass: allow
  // Location of the source code project
  include:
      - src
  // Location of the test files
  testPlacementStrategies:
    - type: co-located
      testFilePattern: "{{sourceFileName}}.spec.ts"
```    

# explanation

| Name | Type | Required |  Example Value or Default Value | Description |
| ---------- | ---------- | ---------- | ---------- | ---------- |
| `version` | string | No | `0.1` | Version infomation |
| `global` | object | Required | - | Global confignation |
| `global.setup` | array | Required | - | Configuration Actions |
| `global.cleanup` | array | No | - | Cleanup Actions |
| `pipeline` | PipelineConfig | Required | - | Pipeline Configuration |
| `pipeline.runTest` | object | Required | - | Run Test Configuration |
| `pipeline.runTest.exec` | array | Required | - | Execute Command |
| `pipeline.runTest.pre` | array | No | - | Preprocessing Command |
| `pipeline.runTest.post` | array | No | - | Post-processing Command |
| `pipeline.updateSource` | object | No | - | Update Source Configuration |
| `pipeline.updateSource.post` | array | Required | - | Update Preprocessing Command |
| `settings` | SettingsConfig | No | - | Set Configuration |
| `settings.exportFunctionOrClass` | string (`allow` `not-allow`)  | `"allow"` | - | Set Configuration |
| `settings.include` | array  | No | src | Inclusions |
| `settings.mockIgnore` | array  | No | `["lodash", "ajv"]` | Mock Exclusions |
| `settings.testPlacementStrategies` | array  | No | The next chapter mainly introduces | Test Placement Strategy |

# About `testPlacementStrategies`
There are two main ways to organize test code.
## centralized
If your project structure is as follows:

{% highlight TXT %}
.
├── package.json
├── src
│   └── sum.ts
└── test
    └── sum.test.ts
{% endhighlight %}      

then you can configure `testPlacementStrategies` like this
{% highlight YAML %}
testPlacementStrategies:
  -  type: centralized
     testDir: test
     testFilePattern: "{{sourceFileName}}.test.ts"
{% endhighlight %}      

## co-located
If your project structure is as follows:
{% highlight TXT %}
.
├── package.json
└── src
    ├── sum.test.ts
    └── sum.ts
{% endhighlight %}      

then you can configure `testPlacementStrategies` like this

{% highlight YAML %}
  testPlacementStrategies:
    - type: co-located
      testFilePattern: "{{sourceFileName}}.test.ts"
{% endhighlight %}      

# Trigger Test Gru to work

## Auto Rrigger by Pull Request
When you complete the configuration, Test Gru will automatically take over your repository. Whenever you submit a PR, Test Gru will automatically detect software that requires unit tests and add tests for it.

![image](https://github.com/user-attachments/assets/ed3bbd18-455f-40bc-99fd-ca3485665651)

After Gru completes writing the test code, it will run the tests. Once it confirms there are no issues with the test code, it will submit a PR with the unit test code to the current PR.

![image](https://github.com/user-attachments/assets/e7af14a3-c9b2-4fba-9bc6-2feb5eacecc6)

## Manual Trigger
You can manually trigger Test Gru on the [Gru.ai](gru.ai/:test).
![image](https://github.com/user-attachments/assets/87fa45b1-2d4b-4871-9dd7-0c257f794341)

It can be triggered by PR or existing code files.
![image](https://github.com/user-attachments/assets/10e5d5d9-b73b-4fba-a2e4-6e11e045a4ff)

![image](https://github.com/user-attachments/assets/d327e627-d341-4ccf-af59-e47bf5195a98)

## Trigger by Push
