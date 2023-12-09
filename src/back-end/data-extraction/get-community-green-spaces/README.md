# getCommunityGreenSpaces
JS Google Cloud Function <br>
To deploy: firebase deploy --only functions <br>
To test locally: firebase emulators:start --only functions <br>
To deploy, execute in cmd: <br>
gcloud functions deploy getCommunityGreenSpaces --runtime nodejs18 --trigger-http --region plumbers-7f4b1 --project  <br>

## Example Input:
Expects POST request with body structure like this:
```
{
  "name": "Burgas"
}
```

## Output
Done! / Error ...
