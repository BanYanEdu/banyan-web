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
package com.calista.banyan;

import com.inet.xportal.nosql.web.NoSQLConstant;

/**
 * BanyanConstant.
 *
 * @author Hien Nguyen
 * @version $Id: BanyanConstant.java Oct 13, 2020 12:09:32 PM nguyen_dv $
 *
 * @since 1.0
 */
public interface BanyanConstant {
	public static final String ROLE_STUDENT = NoSQLConstant.ROLE_COMMUNITY;
	public static final String ROLE_USER = "$banyan_user";
	public static final String ROLE_ADMIN = "$banyan_admin";
}
