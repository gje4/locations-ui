import {
    AlertProps,
    AlertsManager,
    Box,
    createAlertsManager,
    H2,
    Panel,
    Link as StyledLink,
} from '@bigcommerce/big-design'
import { ArrowBackIcon } from '@bigcommerce/big-design-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Loading from '@components/loading'
import SegmentEditor from '@components/segmentEditor'
import { useSegments, } from '@lib/hooks'
import { useSession } from 'context/session'

const alertsManager = createAlertsManager()

const Segment = () => {
    const encodedContext = useSession()?.context
    const router = useRouter()
    const segmentId = router.query.id
    const {
        segments,
        // segmentMeta,
        // segmentsLoading,
        // segmentError,
        mutateSegments,
    } = useSegments({ "id:in": segmentId })

    const onCancel = () => {
        router.push('/')
    }

    const onSave = async ({ label, description, mondayOpenHr, mondayCloseHr, mondayOpen,
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
                        id: segmentId,
                        label,
                        description,
                        operatingHours,
                        address,
                        managed_by_external_source: true,
                        storefront_visibility: true,
                        type_id: "PHYSICAL",
                        code: "BIGC-2",
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
                    method: 'PUT',
                    body,
                    headers: {
                        "content-type": "application/json"
                    }
                },
                url = `/api/locations`

            const res = await fetch(url, options)
            const data = await res.json()
            if (res.status != 200) {
                throw new Error(`Error saving segment${data.message ? `: ${data.message}` : ''}`)
            }
            const alert = {
                header: 'Success',
                autoDismiss: true,
                messages: [
                    {
                        text: `Saved segment: ${name}`
                    }
                ],
                type: 'success',
                onClose: () => null,
            } as AlertProps
            alertsManager.add(alert)
            await mutateSegments()
        } catch (err) {
            console.error(err)
            const alert = {
                header: 'Error saving segment',
                messages: [
                    {
                        text: err.message
                    }
                ],
                type: 'error',
                onClose: () => null,
            } as AlertProps
            alertsManager.add(alert)
        }
    }

    // @ts-ignore
    return !segments
        ? <Loading />
        : <Panel>
            <Box marginBottom="medium">
                <AlertsManager manager={alertsManager} />
                <Link href="/">
                    <StyledLink>
                        <ArrowBackIcon />
                        Back to Segments
                    </StyledLink>
                </Link>
            </Box>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/* @ts-ignore*/}
            <H2>Edit {segments[segmentId]?.label}</H2>

            <SegmentEditor
                onSave={onSave}
                onCancel={onCancel}
                saveText={'Save Segment'}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                segment={segments[segmentId]}
            />
        </Panel>
}

export default Segment
