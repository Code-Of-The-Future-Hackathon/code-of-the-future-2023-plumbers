# get-zone-center

to run:

Open cmd as admin
gcloud functions deploy getZoneCenter --entry-point GetZoneCenter.Program --runtime dotnet6 --trigger-http --allow-unauthenticated --region europe-west1 --project plumbers-7f4b1

## Input:
```
{
    "ZonePoints": [ // array of geo coordinates
		{
			"Lat": 22.2, // double
			"Lng": 23.24, // double
		}
	]
}
```

## Output:
```
{
	"Center": {
		"Lat": 24.42, // double
		"Lng": 24.24, // double
	}
}
```
