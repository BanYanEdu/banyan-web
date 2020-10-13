package com.calista.banyan.provider;

import javax.enterprise.inject.Default;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import com.inet.xportal.nosql.web.bo.AbstractPairValueBO;
import com.inet.xportal.nosql.web.provider.CloudConfigAbstraction;
import com.inet.xportal.web.context.ApplicationContext;
import com.inet.xportal.web.context.ContentContext;

/**
 * 
 * BanyanConfig.
 *
 * @author Hien Nguyen
 * @version $Id: BanyanConfig.java Oct 13, 2020 12:01:15 PM nguyen_dv $
 *
 * @since 1.0
 */
@ApplicationContext(context = "BanyanConfig")
@Default
@Named("BanyanConfig")
@Singleton
public class BanyanConfig extends CloudConfigAbstraction 
{
    @Inject
    protected BanyanConfig(@ContentContext(context = "CloudPairValue") AbstractPairValueBO pairValueBO) 
    {
        super(pairValueBO, "cloud-banyan-config", "cloud-banyan.properties");
    }
}
