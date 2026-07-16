// settings page template — extracted from the prototype page set.
registerPage("page-settings", `
<div id="page-settings" class="page max-w-7xl mx-auto p-4">
  <div class="mb-8">
    <h1 class="text-slate-900 text-2xl font-semibold">Settings</h1>
  </div>

  <div class="border-b border-slate-200/60 mb-8 flex">
    <button id="st-tab-general" class="tab-btn active" onclick="switchStTab('general',this)">Organization</button>
    <button id="st-tab-members" class="tab-btn" onclick="switchStTab('members',this)">Members</button>
    <button id="st-tab-destinations" class="tab-btn" onclick="switchStTab('destinations',this)">Destinations</button>
  </div>

  <!-- Members tab (moved from separate page) -->
  <div id="st-pane-members" class="hidden">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-slate-900 font-medium">Members</h2>
      </div>
      <button id="btn-invite" onclick="openInviteModal()" class="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors" style="background:#039855">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
        Invite Member
      </button>
    </div>

    <div class="bg-white rounded-xl border border-slate-200">
      <div class="divide-y divide-slate-200">
        <!-- Jane (you, owner) -->
        <div class="p-4 hover:bg-slate-50 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#0F172B] text-white flex items-center justify-center font-medium shrink-0">J</div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 mb-0.5"><span class="text-sm font-medium text-slate-900">Jane Niu</span><span class="text-xs text-slate-400">(you)</span><svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div>
              <div class="flex items-center gap-1 text-xs text-slate-500"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>jane@acmeinc.com</div>
            </div>
            <div class="flex items-center gap-4 shrink-0">
              <span class="text-xs text-slate-400">Jan 3, 2026</span>
              <span class="text-xs text-slate-500">1 key</span>
              <div class="role-picker relative w-[100px]" id="jane-role-picker" data-member="Jane Niu" data-current="Owner">
                <button type="button" onclick="toggleRolePicker(this)" class="role-sel role-picker-btn w-full text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white flex items-center justify-between hover:border-slate-300 transition-colors">
                  <span class="role-picker-label">Owner</span>
                  <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div class="role-picker-menu hidden absolute right-0 top-full mt-1 z-50 w-64 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  <div class="p-1">
                    <button type="button" onclick="selectRole(this,'Owner')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg bg-slate-50">
                      <div class="text-xs font-medium flex items-center justify-between" style="color:#039855">Owner <svg class="w-4 h-4" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can manage billing, members, roles, and all API keys</div>
                    </button>
                    <button type="button" onclick="selectRole(this,'Manager')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div class="text-xs font-medium text-slate-900">Manager</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can create and edit API keys, invite members, and view billing</div>
                    </button>
                    <button type="button" onclick="selectRole(this,'Member')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div class="text-xs font-medium text-slate-900">Member</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can use shared and assigned keys, view usage</div>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-[28px]"></div>
            </div>
          </div>
        </div>
        <!-- Alex -->
        <div class="p-4 hover:bg-slate-50 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium shrink-0">A</div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 mb-0.5"><span class="text-sm font-medium text-slate-900">Alex Johnson</span><svg class="w-4 h-4" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></div>
              <div class="flex items-center gap-1 text-xs text-slate-500"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>alex@acmeinc.com</div>
            </div>
            <div class="flex items-center gap-4 shrink-0">
              <span class="text-xs text-slate-400">Jan 15, 2026</span>
              <span class="text-xs text-slate-500">1 key</span>
              <div class="role-picker relative w-[100px]" data-member="Alex Johnson" data-current="Manager">
                <button type="button" onclick="toggleRolePicker(this)" class="role-sel role-picker-btn w-full text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white flex items-center justify-between hover:border-slate-300 transition-colors">
                  <span class="role-picker-label">Manager</span>
                  <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div class="role-picker-menu hidden absolute right-0 top-full mt-1 z-50 w-64 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  <div class="p-1">
                    <button type="button" onclick="selectRole(this,'Owner')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div class="text-xs font-medium text-slate-900">Owner</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can manage billing, members, roles, and all API keys</div>
                    </button>
                    <button type="button" onclick="selectRole(this,'Manager')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg bg-slate-50">
                      <div class="text-xs font-medium flex items-center justify-between" style="color:#039855">Manager <svg class="w-4 h-4" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can create and edit API keys, invite members, and view billing</div>
                    </button>
                    <button type="button" onclick="selectRole(this,'Member')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div class="text-xs font-medium text-slate-900">Member</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can use shared and assigned keys, view usage</div>
                    </button>
                  </div>
                </div>
              </div>
              <button onclick="openRemove('Alex Johnson','alex@acmeinc.com')" id="rem-alex" class="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
            </div>
          </div>
        </div>
        <!-- Sarah -->
        <div class="p-4 hover:bg-slate-50 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-medium shrink-0">S</div>
            <div class="min-w-0 flex-1">
              <div class="mb-0.5"><span class="text-sm font-medium text-slate-900">Sarah Chen</span></div>
              <div class="flex items-center gap-1 text-xs text-slate-500"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>sarah@acmeinc.com</div>
            </div>
            <div class="flex items-center gap-4 shrink-0">
              <span class="text-xs text-slate-400">Feb 2, 2026</span>
              <span class="text-xs text-slate-500">1 key</span>
              <div class="role-picker relative w-[100px]" data-member="Sarah Chen" data-current="Member">
                <button type="button" onclick="toggleRolePicker(this)" class="role-sel role-picker-btn w-full text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white flex items-center justify-between hover:border-slate-300 transition-colors">
                  <span class="role-picker-label">Member</span>
                  <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div class="role-picker-menu hidden absolute right-0 top-full mt-1 z-50 w-64 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  <div class="p-1">
                    <button type="button" onclick="selectRole(this,'Owner')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div class="text-xs font-medium text-slate-900">Owner</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can manage billing, members, roles, and all API keys</div>
                    </button>
                    <button type="button" onclick="selectRole(this,'Manager')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div class="text-xs font-medium text-slate-900">Manager</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can create and edit API keys, invite members, and view billing</div>
                    </button>
                    <button type="button" onclick="selectRole(this,'Member')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg bg-slate-50">
                      <div class="text-xs font-medium flex items-center justify-between" style="color:#039855">Member <svg class="w-4 h-4" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can use shared and assigned keys, view usage</div>
                    </button>
                  </div>
                </div>
              </div>
              <button onclick="openRemove('Sarah Chen','sarah@acmeinc.com')" id="rem-sarah" class="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
            </div>
          </div>
        </div>
        <!-- Bob -->
        <div class="p-4 hover:bg-slate-50 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-medium shrink-0">B</div>
            <div class="min-w-0 flex-1">
              <div class="mb-0.5"><span class="text-sm font-medium text-slate-900">Bob Smith</span></div>
              <div class="flex items-center gap-1 text-xs text-slate-500"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>bob@acmeinc.com</div>
            </div>
            <div class="flex items-center gap-4 shrink-0">
              <span class="text-xs text-slate-400">Mar 20, 2026</span>
              <span class="text-xs text-slate-400">0 keys</span>
              <div class="role-picker relative w-[100px]" data-member="Bob Smith" data-current="Member">
                <button type="button" onclick="toggleRolePicker(this)" class="role-sel role-picker-btn w-full text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white flex items-center justify-between hover:border-slate-300 transition-colors">
                  <span class="role-picker-label">Member</span>
                  <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div class="role-picker-menu hidden absolute right-0 top-full mt-1 z-50 w-64 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  <div class="p-1">
                    <button type="button" onclick="selectRole(this,'Owner')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div class="text-xs font-medium text-slate-900">Owner</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can manage billing, members, roles, and all API keys</div>
                    </button>
                    <button type="button" onclick="selectRole(this,'Manager')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div class="text-xs font-medium text-slate-900">Manager</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can create and edit API keys, invite members, and view billing</div>
                    </button>
                    <button type="button" onclick="selectRole(this,'Member')" class="role-opt w-full text-left px-3 py-2.5 rounded-lg bg-slate-50">
                      <div class="text-xs font-medium flex items-center justify-between" style="color:#039855">Member <svg class="w-4 h-4" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Can use shared and assigned keys, view usage</div>
                    </button>
                  </div>
                </div>
              </div>
              <button onclick="openRemove('Bob Smith','bob@acmeinc.com')" id="rem-bob" class="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending invites -->
    <div class="mt-6 bg-white rounded-xl border border-slate-200 p-4">
      <h3 class="text-sm font-medium text-slate-700 mb-3">Pending Invites</h3>
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
        <div class="flex-1">
          <div class="text-sm text-slate-900">carol@acmeinc.com</div>
          <div class="text-xs text-slate-400">Invited as Member · expires in 6 days</div>
        </div>
        <button onclick="toast('Invitation revoked')" class="text-xs text-slate-400 hover:text-red-500 px-2 py-1 hover:bg-red-50 rounded transition-colors">Revoke</button>
      </div>
    </div>

  </div>

  <!-- Organization tab -->
  <div id="st-pane-general">
    <!-- Organization Info -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <h2 class="text-slate-900 mb-6 font-medium">Organization Information</h2>
      <div class="space-y-5">
        <div>
          <label class="block text-xs text-slate-500 mb-1.5">Organization Name</label>
          <!-- Owner: read-only + Edit button, click to switch to input -->
          <div id="org-name-display" class="flex items-center gap-3">
            <span class="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">Acme Inc</span>
            <button id="org-name-edit-btn" onclick="toggleOrgNameEdit(true)" class="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors shrink-0 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              Edit
            </button>
          </div>
          <!-- Owner: editing mode (hidden by default) -->
          <div id="org-name-edit" class="hidden flex items-center gap-3">
            <input id="org-name-input" type="text" value="Acme Inc" class="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#039855]"/>
            <button onclick="saveOrgName()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90 transition-colors shrink-0" style="background:#039855">Save</button>
            <button onclick="toggleOrgNameEdit(false)" class="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors shrink-0">Cancel</button>
          </div>
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1.5">Organization ID</label>
          <div class="flex items-center gap-3">
            <code class="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono">org_acme_7f3k9x2m4p1q</code>
            <button onclick="navigator.clipboard.writeText('org_acme_7f3k9x2m4p1q');showCopyCheck(this)" class="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors shrink-0 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
          <p class="mt-1.5 text-xs text-slate-400">Used in API requests to identify this organization.</p>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="bg-white rounded-lg border border-slate-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-slate-900">Leave organization</div>
          <div class="text-xs text-slate-500 mt-0.5">Your assigned keys will become shared.</div>
          <div id="leave-sole-owner-hint" class="hidden text-xs text-slate-500 mt-1">You are the only Owner. Transfer ownership before leaving.</div>
        </div>
        <button id="leave-org-btn" onclick="openLeave()" class="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors">Leave</button>
      </div>
    </div>
  </div>

  <!-- Destinations tab -->
  <div id="st-pane-destinations" class="hidden">
    <!-- No-permission state -->
    <div id="dest-no-perm" class="hidden bg-white rounded-lg border border-slate-200 p-10 text-center">
      <svg class="w-10 h-10 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
      <h3 class="text-sm font-medium text-slate-900 mb-1">Collect API access required</h3>
      <p class="text-xs text-slate-500">Contact <a href="mailto:support@octen.ai" class="underline" style="color:#039855">support@octen.ai</a> to enable for this organization.</p>
    </div>

    <!-- Active state -->
    <div id="dest-active">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-slate-900 font-medium">Destinations</h2>
        </div>
        <button onclick="openAddDestination()" class="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add destination
        </button>
      </div>

      <!-- Empty state -->
      <div id="dest-empty" class="hidden bg-white rounded-lg border border-slate-200 p-10 text-center">
        <svg class="w-10 h-10 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"/></svg>
        <h3 class="text-sm font-medium text-slate-900">No destinations yet</h3>
      </div>

      <!-- List -->
      <div id="dest-list-wrap" class="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/50">
              <th class="text-left py-3 px-4 text-xs font-medium text-slate-600">Name</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-slate-600">Type</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-slate-600">Path</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-slate-600">Destination ID</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-slate-600">Status</th>
              <th class="text-right py-3 px-4 text-xs font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody id="dest-list-body"></tbody>
        </table>
      </div>
    </div>
  </div>

</div>
`);
