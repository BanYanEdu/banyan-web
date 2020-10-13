/*****************************************************************
 Copyright 2013 by Duyen Tang (tttduyen@inetcloud.vn)

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
package com.calista.banyan.bf;

import javax.inject.Inject;
import javax.inject.Named;

import com.inet.xportal.nosql.web.bf.MagicContentBF;
import com.inet.xportal.nosql.web.provider.NoSQLConfigProvider;
import com.inet.xportal.web.context.ApplicationContext;
import com.inet.xportal.web.context.ContentContext;

/**
 * 
 * BanyanBF.
 *
 * @author Hien Nguyen
 * @version $Id: BanyanBF.java Oct 13, 2020 12:02:58 PM nguyen_dv $
 *
 * @since 1.0
 */
@Named("BanyanBF")
@ContentContext(context = "BanyanContext")
public class BanyanBF extends MagicContentBF {

    /**
     * Create {@link CalBf} instance
     *
     * @param configProvider the given {@link NoSQLConfigProvider}
     */
    @Inject
    protected BanyanBF(@ApplicationContext(context = "BanyanProvider") NoSQLConfigProvider configProvider) {
        super(configProvider);
    }
}