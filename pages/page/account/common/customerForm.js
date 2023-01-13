import React from 'react';


const CustomerForm = ({shippingInfo,onShippingInfoChange}) => {
    return (
        <>
          <div className="form-group col-md-12 col-sm-12 col-xs-12">
            <div className="field-label">Country</div>
            <select style={{borderRadius:"10px"}} name="country" value={shippingInfo.country} onChange={onShippingInfoChange}>
              <option value="United States">United States</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
          <div className="form-group col-md-12 col-sm-12 col-xs-12">
            <div className="field-label">Address</div>
            <input
              style={{borderRadius:"10px"}}
              type="text"
              name="address"
              placeholder="Street address"
              value={shippingInfo.address} 
              onChange={onShippingInfoChange}
            />
          </div>
          <div className="form-group col-md-12 col-sm-12 col-xs-12">
            <div className="field-label">Town/City</div>
            <input
              style={{borderRadius:"10px"}}
              //className="form-control"
              type="text"
              name="city"
              value={shippingInfo.city} 
              onChange={onShippingInfoChange}
            />
          </div>
          <div className="form-group col-md-12 col-sm-6 col-xs-12">
            <div className="field-label">State / County</div>
            <input
              style={{borderRadius:"10px"}}
              type="text"
              name="state"
              value={shippingInfo.state} 
              onChange={onShippingInfoChange}
            />
          </div>
          <div className="form-group col-md-12 col-sm-6 col-xs-12">
            <div className="field-label">Postal Code</div>
            <input
              style={{borderRadius:"10px"}}
              type="text"
              name="zipcode"
              value={shippingInfo.zipcode} 
              onChange={onShippingInfoChange}
            />
          </div>
        </>
    )
}

export default CustomerForm;