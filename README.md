Forget about Unit Test, you get covered automatically.

This is the example repo for Test Gru.
Test Gru will help you add unit test automatically. [Here is the video to show how Test Gru works](https://www.youtube.com/watch?v=42B-JwLEohM).

Test gru is still in testing phase.
If you have any question, please connect to us:
connect@gru.ai,or join our [discord](https://discord.gg/jGNWxZbCXs).  

Currently, Test Gru only supports Node.js/TypeStript. We are gradually adding support for other languages.

# Creat Test Gru Account
Log in at [Gru.ai](https://gru.ai). Test Gru currently only supports use with GitHub accounts. You need a GitHub account to log in to gru.ai.

![image](https://github.com/user-attachments/assets/ce9847a8-d52a-4198-88cd-2618eb608b7d)

![image](https://github.com/user-attachments/assets/97a4d984-6c66-48d0-a02a-00a647500321)
# Enter Test Gru
Click the top left corner to select [Test Gru](https://gru.ai/:test).

![image](https://github.com/user-attachments/assets/a5e9a05e-7c62-4b67-8e90-ba98a25db973)

# Install Github Application
Follow the steps to install Test Gru.

![image](https://github.com/user-attachments/assets/27680039-8bc2-40e3-b7d1-8487159aa164)
![image](https://github.com/user-attachments/assets/72307cd9-a0ce-47c6-a70b-96e6a7eb2c42)
Then select a repo, perform the configuration.
![image](https://github.com/user-attachments/assets/41b0c77f-9bd3-4f46-b996-4a8a4ecba8ef)
![image](https://github.com/user-attachments/assets/aef27689-1984-4d0d-80ea-4365453f9201)

# Use Example For Quick Start
1. Fork [this repo](https://github.com/gru-agent/testgru-example) 
2. Install App and get configuration from code repo
![image](https://github.com/user-attachments/assets/7f639782-a571-451e-880f-bd18a074f8ad)
3. dispatch src/user.ts
![image](https://github.com/user-attachments/assets/89760ff7-2689-4e43-911c-61f809e0bbbe)
4. Test Gru submits a PR
![image](https://github.com/user-attachments/assets/1e0d82fb-6a4c-451b-8c12-7e799e4dd1c5)

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

![image](https://github.com/user-attachments/assets/8e530ba1-38e9-4c1e-8a63-8a3df8ef181f)

After Gru completes writing the test code, it will run the tests. Once it confirms there are no issues with the test code, it will submit a PR with the unit test code to the current PR.

![image](https://github.com/user-attachments/assets/049e9746-6c74-4656-958a-bf7d9e17bca7)

## Manual Trigger
You can manually trigger Test Gru on the [Gru.ai](gru.ai/:test).
![image](https://github.com/user-attachments/assets/60b52af9-e417-49bc-a819-b29dc7d18be7)

It can be triggered by PR or existing code files.
![image](https://github.com/user-attachments/assets/d964d32a-1162-48e3-bb15-c8f282f1a985)

![image](https://github.com/user-attachments/assets/66718243-d7c2-4e33-9b96-2a90d650ab20)
