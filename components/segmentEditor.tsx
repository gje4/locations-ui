import {Button, Checkbox, Flex, FlexItem, Form, FormGroup, Input, Textarea, Timepicker} from "@bigcommerce/big-design"
import { AddIcon } from '@bigcommerce/big-design-icons'
import { useState } from "react"

const SegmentEditor = ({
    onSave,
    saveText,
    onCancel,
    segment
}) => {
    const [label, setLabel] = useState(segment.label)
    const [storeId, setStoreId] = useState(segment.storeId)

    const [mondayOpenHr, setMondayOpenhr] =  useState<string>();
    const [mondayCloseHr, setMondayClosehr] = useState<string>();
    const [mondayOpen, setMondayOpen] = useState(false)
    const [TuesdayOpenHr, setTuesdayOpenhr] = useState<string>();
    const [TuesdayCloseHr, setTuesdayClosehr] = useState<string>();
    const [TuesdayOpen, setTuesdayOpen] = useState(false)
    const [WedOpenHr, setWedOpenhr] = useState<string>();
    const [WedCloseHr, setWedClosehr] = useState<string>();
    const [WedOpen, setWedOpen] = useState(false)
    const [ThuOpenHr, setThuOpenhr] = useState<string>();
    const [ThuCloseHr, setThuClosehr] = useState<string>();
    const [ThuOpen, setThuOpen] = useState(false)
    const [FriOpenHr, setFriOpenhr] = useState<string>();
    const [FriCloseHr, setFriClosehr] = useState<string>();
    const [FriOpen, setFriOpen] = useState(false)
    const [SatOpenHr, setSatOpenhr] = useState<string>();
    const [SatCloseHr, setSatClosehr] = useState<string>();
    const [SatOpen, setSatOpen] = useState(false)
    const [SunOpenHr, setSunOpenenhr] = useState<string>();
    const [SunCloseHr, setSunClosehr] = useState<string>();
    const [SunOpen, setSunOpen] = useState(false)

    //address
    const [address1, setAddress1] = useState<string>();
    const [address2, setAddress2] = useState<string>();
    const [city, setCity] = useState<string>();
    const [state, setState] = useState<string>();
    const [zipcode, setZipcode] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [country, setCountry] = useState<string>();

    const [description, setDescription] = useState(segment.description)
    const [loading, setLoading] = useState(false)


    return <Form>
        <Flex flexWrap="wrap">
            <FlexItem flexBasis="50%">
        <FormGroup>
            <Input
                label="Location label"
                placeholder="Location label"
                value={label}
                onChange={e => setLabel(e.target.value)}
                disabled={loading}
                required
            />
            <Input
                label="Store Id"
                placeholder="Store Id"
                value={storeId}
                onChange={e => setStoreId(e.target.value)}
                disabled={loading}
                required
            />
        </FormGroup>

                <FormGroup>
            <Textarea
                label="Description"
                placeholder="A descprition for the store"
                resize={true}
                rows={4}
                value={description}
                disabled={loading}
                onChange={e => setDescription(e.target.value)}
            />
        </FormGroup>

            <Input
                label="address1"
                placeholder="address1"
                value={address1}
                onChange={e => setAddress1(e.target.value)}
                disabled={loading}
                required
            />
            <Input
                label="address2"
                placeholder="address2"
                value={address2}
                onChange={e => setAddress2(e.target.value)}
                disabled={loading}
                required
            />
            <Input
                label="city"
                placeholder="city"
                value={city}
                onChange={e => setCity(e.target.value)}
                disabled={loading}
                required
            />
            <Input
                label="State"
                placeholder="State / Provance"
                value={state}
                onChange={e => setState(e.target.value)}
                disabled={loading}
                required
            />
            <Input
                label="Zipcode/Postal"
                placeholder="Zipcode"
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}
                disabled={loading}
                required
            />
            <Input
                label="Email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                required
            />
            <Input
                label="Phone"
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                disabled={loading}
                required
            />
            <Input
                label="CountryCode"
                placeholder="CountryCode"
                value={country}
                onChange={e => setCountry(e.target.value)}
                disabled={loading}
                required
            />
        </FlexItem>
            <FlexItem flexBasis="50%">

            <h2> Operating Hours</h2>
        <FormGroup>
            <Timepicker
                label="Monday Open"
                onTimeChange={(value) => setMondayOpenhr(value)}
                value={mondayOpenHr}
            />
            <Timepicker
                label="Monday Close"
                onTimeChange={(value) => setMondayClosehr(value)}
                value={mondayCloseHr}
            />
            <Checkbox checked={mondayOpen} label="Open" onChange={e => setMondayOpen(e.target.checked)}
            />
        </FormGroup>
        <FormGroup>
            <Timepicker
                label="Tuesday Open"
                onTimeChange={(value) => setTuesdayOpenhr(value)}
                value={TuesdayOpenHr}
            />
            <Timepicker
                label="Tuesday Close"
                onTimeChange={(value) => setTuesdayClosehr(value)}
                value={TuesdayCloseHr}
            />
            <Checkbox checked={TuesdayOpen} label="Open" onChange={e => setTuesdayOpen(e.target.checked)}/>
        </FormGroup>
        <FormGroup>
            <Timepicker
                label="Wednesday Open"
                onTimeChange={(value) => setWedOpenhr(value)}
                value={WedOpenHr}
            />
            <Timepicker
                label="Wednesday Close"
                onTimeChange={(value) => setWedClosehr(value)}
                value={WedCloseHr}
            />
            <Checkbox checked={WedOpen} label="Open" onChange={e => setWedOpen(e.target.checked)}/>
        </FormGroup>
        <FormGroup>
            <Timepicker
                label="Thursday Open"
                onTimeChange={(value) => setThuOpenhr(value)}
                value={ThuOpenHr}
            />
            <Timepicker
                label="Thursday Close"
                onTimeChange={(value) => setThuClosehr(value)}
                value={ThuCloseHr}
            />
            <Checkbox checked={ThuOpen} label="Open" onChange={e => setThuOpen(e.target.checked)}/>
        </FormGroup>
        <FormGroup>
            <Timepicker
                label="Friday Open"
                onTimeChange={(value) => setFriOpenhr(value)}
                value={FriOpenHr}
            />
            <Timepicker
                label="Friday Close"
                onTimeChange={(value) => setFriClosehr(value)}
                value={FriCloseHr}
            />
            <Checkbox checked={FriOpen} label="Open"  onChange={e => setFriOpen(e.target.checked)}/>
        </FormGroup>
        <FormGroup>
            <Timepicker
                label="Saturday Open"
                onTimeChange={(value) => setSatOpenhr(value)}
                value={SatOpenHr}
            />
            <Timepicker
                label="Saturday Close"
                onTimeChange={(value) => setSatClosehr(value)}
                value={SatCloseHr}
            />
            <Checkbox checked={SatOpen} label="Open" onChange={e => setSatOpen(e.target.checked)}/>
        </FormGroup>
        <FormGroup>
            <Timepicker
                label="Sunday Open"
                onTimeChange={(value) => setSunOpenenhr(value)}
                value={SunOpenHr}
            />
            <Timepicker
                label="Sunday Close"
                onTimeChange={(value) => setSunClosehr(value)}
                value={SunCloseHr}
            />
            <Checkbox checked={SunOpen} label="Open" onChange={e => setSunOpen(e.target.checked)}/>

        </FormGroup>

            </FlexItem>
        </Flex>
        <Button
            iconLeft={<AddIcon />}
            isLoading={loading}
            onClick={async (e) => {
                e.preventDefault()
                setLoading(true)
                await onSave({ label, description, mondayOpenHr, mondayCloseHr, mondayOpen,
                    TuesdayOpenHr,TuesdayCloseHr,TuesdayOpen,WedOpenHr,WedCloseHr,WedOpen,
                    ThuOpenHr,ThuCloseHr,ThuOpen,FriOpenHr,FriCloseHr,FriOpen,SatOpenHr,SatCloseHr,SatOpen,
                    SunOpenHr,SunCloseHr,SunOpen, address1,address2,city,state,zipcode,email,phone,country

                })
                setLoading(false)
            }}
        >
            {saveText}
        </Button>
        <Button
            variant="secondary"
            onClick={onCancel}
        >
            Cancel
        </Button>
    </Form>
}

export default SegmentEditor
