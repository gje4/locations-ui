import { AlertProps, AlertsManager, Box, createAlertsManager, H2 } from "@bigcommerce/big-design"
import SegmentEditor from './segmentEditor'

const alertsManager = createAlertsManager()

const CreateSegment = ({
    encodedContext,
    onCancel,
    mutateSegments,
    addAlert
}) => {

    const handleClick = async ({ label, description, mondayOpenHr, mondayCloseHr, mondayOpen,
                                   TuesdayOpenHr,TuesdayCloseHr,TuesdayOpen,WedOpenHr,WedCloseHr,WedOpen,
                                   ThuOpenHr,ThuCloseHr,ThuOpen,FriOpenHr,FriCloseHr,FriOpen,SatOpenHr,SatCloseHr,SatOpen,
                                   SunOpenHr,SunCloseHr,SunOpen, address1,address2,city,state,zipcode,email,phone,country
                               }) => {

        const operatingHours = {
            "monday":  {
                "open": mondayOpen,
               "opening": mondayOpenHr,
               "closing": mondayCloseHr,
            },
                "tuesday":  {
                    "open": TuesdayOpen,
                    "opening": TuesdayOpenHr,
                    "closing": TuesdayCloseHr,
                },
                "wednesday":  {
                    "open": WedOpen,
                    "opening": WedOpenHr,
                    "closing": WedCloseHr,
                },
                "thursday":  {
                    "open": ThuOpen,
                    "opening": ThuOpenHr,
                    "closing": ThuCloseHr,
                },
                "friday":  {
                    "open": FriOpen,
                    "opening": FriOpenHr,
                    "closing": FriCloseHr,
                },
                "saturday":  {
                    "open": SatOpen,
                    "opening": SatOpenHr,
                    "closing": SatCloseHr,
                },
                "sunday":  {
                    "open": SunOpen,
                    "opening": SunOpenHr,
                    "closing": SunCloseHr,
                }
        }

        const address = {
                address1: address1,
                address2: address2,
                city: city,
                zip:zipcode,
                state: state,
                phone: phone,
                email: email,
            geo_coordinates: {
                "latitude": 40.774378,
                "longitude": -73.9653178
            },
            country_code:country,

        }




        try {
            const body = JSON.stringify([
                {
                    label,
                    description,
                    operatingHours,
                    address,
                    managed_by_external_source: true,
                    storefront_visibility: true,
                    type_id: "PHYSICAL",
                    time_zone: "Etc/UTC",
                    special_hours: [
                        {
                            "closing": "09:00",
                            "date": "2022-09-29",
                            "label": "Thanksgiving",
                            "open": true,
                            "opening": "09:00"
                        }
                    ],
                    enabled: true
                }
            ]),
                options = {
                    method: 'POST',
                    body,
                    headers: {
                        "content-type": "application/json"
                    }
                },
                // url = `/api/locations?context=${encodedContext}`
                url = `/api/locations`

            const res = await fetch(url, options)
            const data = await res.json()
            if (res.status != 200) {
                throw new Error(`Error creating segment${data.message ? `: ${data.message}` : ''}`)
            }
            const alert = {
                header: 'Success',
                autoDismiss: true,
                messages: [
                    {
                        text: `Created location: ${label}`
                    }
                ],
                type: 'success',
                onClose: () => null,
            } as AlertProps
            addAlert(alert)
            await mutateSegments()
            onCancel()
        } catch (err) {
            console.error(err)
            const alert = {
                header: 'Error creating segment',
                messages: [
                    {
                        text: err.message
                    }
                ],
                type: 'error',
                onClose: () => null,
            } as AlertProps
            addAlert(alert)
        }
    }

    return <Box marginTop="large">
        <AlertsManager manager={alertsManager} />
        <H2>Create a Location</H2>
        <SegmentEditor
            onSave={handleClick}
            onCancel={onCancel}
            saveText="Save Location"
            segment={{ label: "", description: "" }}
        />
    </Box>
}

export default CreateSegment
