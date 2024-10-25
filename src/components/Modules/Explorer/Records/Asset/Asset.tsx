import './Asset.scss';
import React, {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {Grid, Link, Tab, Tabs} from "@mui/material";
import {loadAsset} from "../../../../../redux/explorer/actions/asset";
import {CoreAsset} from "../../../../../packages/core-sdk/classes/core/CoreAsset";
import NumberFormat from "react-number-format";
import LinkToAccount from "../../Common/Links/LinkToAccount";
import LoadingTile from "../../../../Common/LoadingTile/LoadingTile";
import {shadedClr} from "../../../../../utils/common";
import JsonViewer from "../../../../Common/JsonViewer/JsonViewer";
import CustomError from "../../Common/CustomError/CustomError";
import AssetARCValidator from "./Actions/AssetARCValidator/AssetARCValidator";
import MultiFormatViewer from "../../../../../components/Common/MultiFormatViewer/MultiFormatViewer";
import Copyable from "../../../../../components/Common/Copyable/Copyable";

function Asset(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    const asset = useSelector((state: RootState) => state.asset);
    const assetInstance = new CoreAsset(asset.information);

    useEffect(() => {
        dispatch(loadAsset(Number(id)));
        document.title = `V.O: Asset ${id}`
    }, [dispatch, id]);

    const b64Name = !assetInstance.getName()

    return (<div className={"asset-wrapper"}>
        <div className={"asset-container"}>

            {asset.error ? <CustomError></CustomError> : <div>
                <div className="asset-header">
                    <div>
                        Asset overview
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <AssetARCValidator asset={asset.information}></AssetARCValidator>
                        <span style={{marginLeft: 10}}>
                            <JsonViewer obj={asset.information} title="Asset"></JsonViewer>
                        </span>
                    </div>
                </div>

                {asset.loading ? <LoadingTile></LoadingTile> : <div className="asset-body">
                    <div className="index">
                        <div><span className="no-select">#</span>{assetInstance.getIndex()}<Copyable value={assetInstance.getIndex()} /></div>
                        <div style={{marginTop: 5}}>
                            {assetInstance.getUrl() ? <>
                                <Link href={assetInstance.getUrl()} target={"_blank"} style={{fontSize: 13, marginTop: 10}}>{assetInstance.getUrl()}</Link><Copyable value={assetInstance.getUrl()} />
                            </>: ''}
                        </div>
                    </div>

                    <div className="props" style={{background: shadedClr}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property">
                                    <div className="key">
                                        Name
                                    </div>
                                    <div className="value" style={{wordBreak: b64Name ? 'break-word' : 'inherit'}}>
                                        <MultiFormatViewer view={b64Name ? 'base64' : 'utf8'} value={assetInstance.getNameB64()} />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property">
                                    <div className="key">
                                        Unit
                                    </div>
                                    <div className="value">
                                        <MultiFormatViewer view={assetInstance.getUnitName() ? 'utf8' : 'base64'} value={assetInstance.getUnitNameB64()} />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property">
                                    <div className="key">
                                        Total supply
                                    </div>
                                    <div className="value">
                                        <NumberFormat
                                            value={assetInstance.getTotalSupply()}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                        />
                                        <Copyable value={assetInstance.getTotalSupply()} />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property">
                                    <div className="key">
                                        Decimals
                                    </div>
                                    <div className="value">
                                        {assetInstance.getDecimals()}
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="property">
                                    <div className="key">
                                        Creator
                                    </div>
                                    <div className="value addr">
                                        <LinkToAccount address={assetInstance.getCreator()}></LinkToAccount>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="property">
                                    <div className="key">
                                        Metadata hash
                                    </div>
                                    <div className="value addr">
                                        {assetInstance.getMetadataHash() ? assetInstance.getMetadataHash() : '--Empty--'}
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <div className="property">
                                    <div className="key">
                                        Default frozen
                                    </div>
                                    <div className="value">
                                        {assetInstance.getDefaultFrozen() ? 'Yes' : 'No'}
                                    </div>
                                </div>
                            </Grid>


                        </Grid>
                    </div>


                    <div className="props" style={{background: shadedClr}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="property">
                                    <div className="key">
                                        Manager
                                    </div>
                                    <div className="value addr">
                                        {assetInstance.hasManager() ? <LinkToAccount address={assetInstance.getManager()}></LinkToAccount> : '--None--'}
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="property">
                                    <div className="key">
                                        Reserve
                                    </div>
                                    <div className="value addr">
                                        {assetInstance.hasReserve() ? <LinkToAccount address={assetInstance.getReserve()}></LinkToAccount> : '--None--'}
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="property">
                                    <div className="key">
                                        Freeze
                                    </div>
                                    <div className="value addr">
                                        {assetInstance.hasFreeze() ? <LinkToAccount address={assetInstance.getFreeze()}></LinkToAccount> : '--None--'}
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                <div className="property">
                                    <div className="key">
                                        Clawback
                                    </div>
                                    <div className="value addr">
                                        {assetInstance.hasClawback() ? <LinkToAccount address={assetInstance.getClawback()}></LinkToAccount> : '--None--'}
                                    </div>
                                </div>
                            </Grid>

                        </Grid>
                    </div>


                    <div className="props" style={{background: shadedClr}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>

                                <div className="property">
                                    <div className="key">
                                        Resolved Url
                                    </div>
                                    <div className="value addr">
                                        {assetInstance.getResolvedUrl() ? <Link href={assetInstance.getResolvedUrl()} target={"_blank"}>{assetInstance.getResolvedUrl()}</Link> : ''}
                                    </div>
                                </div>


                            </Grid>
                        </Grid>
                    </div>

                    <div className="asset-tabs">

                        <Tabs TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" />}} value="transactions" className="related-list">
                            <Tab label="Transactions" value="transactions" onClick={() => {
                                navigate('/explorer/asset/' + id + '/transactions');
                            }}/>
                        </Tabs>

                        <Outlet />


                    </div>
                </div>}
            </div>}


        </div>
    </div>);
}

export default Asset;
