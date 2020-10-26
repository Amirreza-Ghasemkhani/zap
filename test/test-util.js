/**
 *
 *    Copyright (c) 2020 Silicon Labs
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

var testPort = 9073

function testServer() {
  var ret = {
    port: testPort,
    baseUrl: `http://localhost:${testPort++}`,
  }
  return ret
}

exports.testZigbeeGenerationTemplates =
  './test/gen-template/zigbee/gen-templates.json'

exports.testChipGenerationTemplates =
  './test/gen-template/chip/gen-templates.json'

exports.testServer = testServer
