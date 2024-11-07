Forget about Unit Test, you get covered automatically.

This is the example repo for Test Gru.
Test Gru will help you add unit test automatically.

Test gru is still in testing phase.
If you have any question, please connect to us:
connect@gru.ai,or join our [discord](https://discord.gg/jGNWxZbCXs).  

Currently, Test Gru only supports Node.js/TypeStript. We are gradually adding support for other languages.

# Creat Test Gru Account
Log in at [Gru.ai](https://gru.ai). Test Gru currently only supports use with GitHub accounts. You need a GitHub account to log in to gru.ai.

![image](https://babelcloud-blog-assets.s3.us-west-2.amazonaws.com/d7aa903c-467a-4308-9b02-d99265c305f3.png)

![image](https://babelcloud-blog-assets.s3.us-west-2.amazonaws.com/691fd5c4-7b9c-47ab-b6eb-08870e5fe6a0.png)

# Enter Test Gru
Click the top left corner to select [Test Gru](https://gru.ai/:test).

![iamge](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/5f34b7b2-34a1-4470-81e9-7cf07ad49b01.png)


# Install Github Application
Follow the steps to install Test Gru.

![image](https://babelcloud-blog-assets.s3.us-west-2.amazonaws.com/0cebf5aa-059a-44b3-a84b-4cf17f05589e.png)

![iamge](https://babelcloud-blog-assets.s3.us-west-2.amazonaws.com/b73759b6-da11-4cc9-8104-9a8bcfacf6f0.png)

Then select a repo, perform the configuration.
![image](https://babelcloud-blog-assets.s3.us-west-2.amazonaws.com/98527156-c696-42c1-a903-6a5fcf457c43.png)
![image](https://babelcloud-blog-assets.s3.us-west-2.amazonaws.com/4db0c25e-4cf9-47b7-bf54-9a582c937b7a.png)

# Use Example For Quick Start
1. Fork [this repo](https://github.com/gru-agent/testgru-example) 
2. Install App and get configuration from code repo
![image](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/8943d6f2-b6b6-459d-9879-c2c2d2036e92.png)
3. dispatch src/user.ts 
![image](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/e2996852-ec19-4ee2-a278-255250b06cae.png)
4. Test Gru submits a PR
![image](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/36d795f7-0a69-4f49-88af-fe35550bf2a7.png)

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

# Trigger TestGru to work



## Auto Rrigger by Pull Request
When you complete the configuration, Test Gru will automatically take over your repository. Whenever you submit a PR, Test Gru will automatically detect software that requires unit tests and add tests for it.

![image](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/05b3ee5a-e223-4ca9-bcb7-42e7a482991e.png)

After Gru completes writing the test code, it will run the tests. Once it confirms there are no issues with the test code, it will submit a PR with the unit test code to the current PR.

![image](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/4f9ef691-964c-4450-86b7-80d6f571ae18.png)

## Manual Trigger
You can manually trigger Test Gru on the [Gru.ai](gru.ai/:test).
![image](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/85b35eff-e1e0-409b-8db8-7ab32b707dbd.png)

It can be triggered by PR or existing code files.
![image](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/06553416-71f7-4974-9344-ab7c4f6aa43a.png)
![image](https://babel-activate2-blog-assets.s3.us-west-2.amazonaws.com/bb9f61b5-2492-4b4e-a9d0-6378ae60edb9.png)
