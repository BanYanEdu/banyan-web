/*****************************************************************
   Copyright 2020 by Hien Nguyen (hiennguyen@inetcloud.vn)

   Licensed under the iNet Solutions Corp.,;
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.inetcloud.vn/licenses

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 *****************************************************************/
package com.calista.banyan.dataservice;

import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import com.inet.xportal.module.web.bo.FirmOutletBO;
import com.inet.xportal.module.web.model.FirmOutlet;
import com.inet.xportal.module.web.plugin.dataservice.PluginSubfirmAbstraction;
import com.inet.xportal.module.web.util.FirmServiceUtil;
import com.inet.xportal.nosql.web.data.SearchDTO;
import com.inet.xportal.nosql.web.model.SiteDataModel;
import com.inet.xportal.nosql.web.model.SubFirmProfile;
import com.inet.xportal.web.WebConstant;
import com.inet.xportal.web.action.AbstractBaseAction;
import com.inet.xportal.web.annotation.XPortalDataService;
import com.inet.xportal.web.annotation.XPortalPageRequest;
import com.inet.xportal.web.exception.WebOSBOException;
import com.inet.xportal.web.interfaces.ObjectWebDataservice;
import com.inet.xportal.web.interfaces.WebDataService;

/**
 * 
 * BanyanOutletDataservice.
 *
 * @author Hien Nguyen
 * @version $Id: BanyanOutletDataservice.java Oct 13, 2020 3:19:38 PM nguyen_dv $
 *
 * @since 1.0
 */
@Named("banyanoutletlist")
@XPortalDataService(description="Banyan Outlet service")
@XPortalPageRequest(uri="banyan/outlet/list", 
	inherit = true,
	result = WebConstant.ACTION_XSTREAM_JSON_RESULT)
public class BanyanOutletDataservice extends PluginSubfirmAbstraction {
	@Inject
	private FirmOutletBO outletBO;
	/*
	 * After account was created, payment process will be created
	 * (non-Javadoc)
	 * @see com.inet.xportal.nosql.web.dataservice.UserCreateAbstraction#service(com.inet.xportal.common.profile.BaseUserModel, java.lang.Object, com.inet.xportal.web.action.AbstractBaseAction, java.util.Map)
	 */
	@Override
	protected WebDataService service(final SiteDataModel site,
			final SubFirmProfile firm, 
			final AbstractBaseAction action, 
			final Map<String, Object> params) throws WebOSBOException
	{
		SearchDTO<FirmOutlet> result = outletBO.query(FirmServiceUtil.getOrganEmail(site, firm));
		
		if (result == null)
			result = new SearchDTO<>();
		
		return new ObjectWebDataservice<>(result);
	}
}
